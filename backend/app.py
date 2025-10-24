from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# In-memory storage (in production, use a database)
ideas = []
users = [
    {'id': 1, 'name': 'User', 'points': 0, 'ideasCount': 0}
]

def calculate_diversity_score(ideas_list):
    """Calculate diversity score based on idea embeddings"""
    if len(ideas_list) < 2:
        return 0.0, {}
    
    # Get embeddings for all ideas
    descriptions = [idea['description'] for idea in ideas_list]
    embeddings = model.encode(descriptions)
    
    # Calculate pairwise similarity
    similarities = cosine_similarity(embeddings)
    
    # Calculate diversity as inverse of average similarity
    # Exclude diagonal (self-similarity)
    n = len(similarities)
    total_similarity = (similarities.sum() - n) / (n * (n - 1))
    diversity_score = (1 - total_similarity) * 100
    
    # Calculate category distribution
    categories = {}
    for idea in ideas_list:
        category = idea.get('category', 'Unknown')
        categories[category] = categories.get(category, 0) + 1
    
    return max(0, min(100, diversity_score)), categories

def get_openai_prompts():
    """Generate AI prompts using OpenAI API or fallback prompts"""
    # For now, return creative prompts
    # In production, integrate with OpenAI API
    prompts = [
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
                    "content": "Generate 5 creative thinking prompts to inspire innovative ideas."
                }],
                max_tokens=200
            )
            ai_prompts = response.choices[0].message.content.strip().split('\n')
            return [p.strip('- ').strip() for p in ai_prompts if p.strip()]
        except Exception as e:
            print(f"OpenAI API error: {e}")
    
    # Return random selection of prompts
    import random
    return random.sample(prompts, 5)

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
        diversity_score, distribution = calculate_diversity_score(ideas)
        socketio.emit('diversity_update', {
            'score': diversity_score,
            'distribution': distribution
        })
        
        return jsonify(idea), 201
    
    return jsonify(ideas), 200

@app.route('/api/diversity', methods=['GET'])
def get_diversity():
    diversity_score, distribution = calculate_diversity_score(ideas)
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
    prompts = get_openai_prompts()
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
