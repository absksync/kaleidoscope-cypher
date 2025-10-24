from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import numpy as np
import os
from datetime import datetime
import random

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# In-memory storage (in production, use a database)
ideas = []
users = [
    {'id': 1, 'name': 'User', 'points': 0, 'ideasCount': 0}
]

def calculate_diversity_score_simple(ideas_list):
    """
    Calculate diversity score based on category distribution and idea count
    For full semantic analysis, install sentence-transformers and use calculate_diversity_score()
    """
    if len(ideas_list) < 2:
        return 0.0, {}
    
    # Calculate category distribution
    categories = {}
    for idea in ideas_list:
        category = idea.get('category', 'Unknown')
        categories[category] = categories.get(category, 0) + 1
    
    # Calculate diversity based on category distribution
    # More categories and more even distribution = higher diversity
    num_categories = len(categories)
    total_ideas = len(ideas_list)
    
    # Calculate entropy-based diversity
    diversity = 0
    for count in categories.values():
        p = count / total_ideas
        diversity -= p * np.log(p) if p > 0 else 0
    
    # Normalize to 0-100 scale
    max_diversity = np.log(min(num_categories, total_ideas))
    diversity_score = (diversity / max_diversity * 100) if max_diversity > 0 else 0
    
    return min(100, max(0, diversity_score)), categories

def calculate_diversity_score_ml(ideas_list):
    """
    Advanced diversity calculation using SentenceTransformers
    This function is a placeholder. To use ML-based diversity:
    1. Install: pip install sentence-transformers scikit-learn
    2. Uncomment the code below
    3. Replace calculate_diversity_score_simple() calls with this function
    """
    # TODO: Uncomment and use this implementation when ML dependencies are installed
    # Requires: pip install sentence-transformers scikit-learn
    # from sentence_transformers import SentenceTransformer
    # from sklearn.metrics.pairwise import cosine_similarity
    # 
    # if len(ideas_list) < 2:
    #     return 0.0, {}
    # 
    # model = SentenceTransformer('all-MiniLM-L6-v2')
    # descriptions = [idea['description'] for idea in ideas_list]
    # embeddings = model.encode(descriptions)
    # 
    # similarities = cosine_similarity(embeddings)
    # n = len(similarities)
    # total_similarity = (similarities.sum() - n) / (n * (n - 1))
    # diversity_score = (1 - total_similarity) * 100
    # 
    # categories = {}
    # for idea in ideas_list:
    #     category = idea.get('category', 'Unknown')
    #     categories[category] = categories.get(category, 0) + 1
    # 
    # return max(0, min(100, diversity_score)), categories
    
    # Fallback to simple method if ML dependencies not installed
    return calculate_diversity_score_simple(ideas_list)

def get_creative_prompts():
    """Generate creative thinking prompts"""
    all_prompts = [
        "What if we combined two existing features in an unexpected way?",
        "How would a child solve this problem?",
        "What's the opposite of our current approach?",
        "How can we make this 10x better, not just 10% better?",
        "What would this look like in a different industry?",
        "If you had unlimited resources, what would you build?",
        "What's the smallest change that could make the biggest impact?",
        "How would nature solve this problem?",
        "What if we removed the biggest constraint?",
        "What would a sci-fi version of this idea look like?",
        "How can we simplify this by removing features?",
        "What would the user experience be in 2030?",
        "How would you explain this to your grandmother?",
        "What's a crazy idea that might actually work?",
        "If we started from scratch today, what would we do differently?",
    ]
    
    # Try to use OpenAI if API key is available
    openai_key = os.getenv('OPENAI_API_KEY')
    if openai_key:
        try:
            import openai
            openai.api_key = openai_key
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{
                    "role": "system",
                    "content": "Generate 5 creative thinking prompts to inspire innovative ideas. Each prompt should be a thought-provoking question."
                }],
                max_tokens=200
            )
            ai_prompts = response.choices[0].message.content.strip().split('\n')
            return [p.strip('- ').strip() for p in ai_prompts if p.strip()]
        except Exception as e:
            print(f"OpenAI API error: {e}")
    
    # Return random selection of prompts
    return random.sample(all_prompts, 5)

@app.route('/api/ideas', methods=['GET', 'POST'])
def handle_ideas():
    if request.method == 'POST':
        data = request.json
        idea = {
            'id': len(ideas) + 1,
            'title': data.get('title'),
            'description': data.get('description'),
            'category': data.get('category'),
            'userId': data.get('userId', 1),
            'userName': data.get('userName', 'User'),
            'timestamp': datetime.now().isoformat()
        }
        ideas.append(idea)
        
        # Update user points
        user = next((u for u in users if u['id'] == idea['userId']), None)
        if user:
            user['points'] += 10
            user['ideasCount'] = user.get('ideasCount', 0) + 1
        
        # Broadcast to all clients
        socketio.emit('new_idea', idea)
        
        # Calculate and broadcast updated diversity
        diversity_score, distribution = calculate_diversity_score_simple(ideas)
        socketio.emit('diversity_update', {
            'score': diversity_score,
            'distribution': distribution
        })
        
        return jsonify(idea), 201
    
    return jsonify(ideas), 200

@app.route('/api/diversity', methods=['GET'])
def get_diversity():
    diversity_score, distribution = calculate_diversity_score_simple(ideas)
    return jsonify({
        'score': diversity_score,
        'distribution': distribution
    })

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    sorted_users = sorted(users, key=lambda x: x['points'], reverse=True)
    return jsonify(sorted_users)

@app.route('/api/prompts', methods=['GET'])
def get_prompts():
    prompts = get_creative_prompts()
    return jsonify({'prompts': prompts})

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('connected', {'data': 'Connected to Kaleidoscope Cypher'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)

