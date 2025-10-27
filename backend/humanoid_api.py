"""
Project Kaleidoscope - Flask Backend API
Single-file implementation with Mock Cognitive Diversity Engine
Now with MongoDB persistence
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import random
import uuid
from datetime import datetime
from typing import List, Dict, Any
import threading
import time
import os

# Initialize Flask application
app = Flask(__name__)
app.config['SECRET_KEY'] = 'kaleidoscope-secret-2025'
CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# MongoDB Configuration - Use environment variable or fallback to localhost
MONGO_URI = os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/')
DB_NAME = 'kaleidoscope_db'

# Initialize MongoDB client
try:
    mongo_client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    # Test connection
    mongo_client.admin.command('ping')
    db = mongo_client[DB_NAME]
    ideas_collection = db['ideas']
    users_collection = db['active_users']
    print("✓ MongoDB connected successfully")
except ConnectionFailure as e:
    print(f"✗ MongoDB connection failed: {e}")
    print("  Please ensure MongoDB is running at mongodb://localhost:27017/")
    db = None
    ideas_collection = None
    users_collection = None

# In-memory state management (for session tracking)
application_state = {
    'active_users': set(),
    'session_to_user': {}
}

# Lock for thread-safe operations
state_lock = threading.Lock()


class MockCognitiveDiversityEngine:
    """
    Mock NLP Engine simulating cognitive diversity analysis
    Generates 384-dimensional embeddings and diversity metrics
    """
    
    EMBEDDING_DIMENSION = 384
    
    @staticmethod
    def generate_embedding(text: str) -> List[float]:
        """Generate a mock 384-dimensional embedding for an idea"""
        # Use text hash for reproducibility
        random.seed(hash(text))
        embedding = [random.uniform(-1.0, 1.0) for _ in range(MockCognitiveDiversityEngine.EMBEDDING_DIMENSION)]
        random.seed()  # Reset seed
        return embedding
    
    @staticmethod
    def calculate_diversity_metrics(ideas_count: int) -> Dict[str, Any]:
        """Calculate mock diversity metrics for the idea collection"""
        if ideas_count == 0:
            return {
                'fluency': 0,
                'flexibility': 0,
                'originality': 0.0,
                'elaboration': 0.0
            }
        
        return {
            'fluency': ideas_count,
            'flexibility': min(ideas_count, random.randint(2, 5)),  # Mock domain count
            'originality': round(random.uniform(0.65, 0.95), 2),
            'elaboration': round(random.uniform(0.70, 0.90), 2)
        }


class IdeaVariationGenerator:
    """
    Simulates Perspective Reframing and Creativity Techniques
    Implements Random Word Association and Reverse Brainstorming
    """
    
    RANDOM_WORDS = [
        'ocean', 'mountain', 'lightning', 'mirror', 'clock', 'garden', 
        'bridge', 'telescope', 'compass', 'butterfly', 'volcano', 'crystal',
        'orchestra', 'library', 'maze', 'prism', 'anchor', 'horizon'
    ]
    
    @staticmethod
    def generate_variations(idea_text: str) -> Dict[str, Any]:
        """Generate idea variations using different creativity techniques"""
        
        # Randomly select a technique
        technique = random.choice(['random_word_association', 'reverse_brainstorming'])
        
        if technique == 'random_word_association':
            return IdeaVariationGenerator._random_word_association(idea_text)
        else:
            return IdeaVariationGenerator._reverse_brainstorming(idea_text)
    
    @staticmethod
    def _random_word_association(idea_text: str) -> Dict[str, Any]:
        """Generate variations using Random Word Association technique"""
        selected_words = random.sample(IdeaVariationGenerator.RANDOM_WORDS, 3)
        
        variations = []
        for word in selected_words:
            variation = {
                'variation_text': f"What if we combine '{idea_text[:50]}...' with the concept of a {word}? "
                                f"This could lead to a {word}-inspired approach that transforms the original idea.",
                'technique': 'Random Word Association',
                'stimulus': word,
                'reasoning': f"Associating with '{word}' opens unexpected neural pathways, "
                           f"potentially revealing innovative angles and creative solutions."
            }
            variations.append(variation)
        
        return {
            'method_used': 'Random Word Association',
            'description': 'Combines unrelated concepts to spark creative connections',
            'generated_ideas': variations
        }
    
    @staticmethod
    def _reverse_brainstorming(idea_text: str) -> Dict[str, Any]:
        """Generate variations using Reverse Brainstorming technique"""
        
        reverse_prompts = [
            "How could we make this idea completely fail?",
            "What would be the worst possible implementation?",
            "How could we ensure nobody wants to use this?",
            "What assumptions make this idea seem impossible?"
        ]
        
        selected_prompts = random.sample(reverse_prompts, 3)
        variations = []
        
        for i, prompt in enumerate(selected_prompts, 1):
            variation = {
                'variation_text': f"Reverse Challenge #{i}: {prompt} "
                                f"By inverting this question, we discover: "
                                f"[The opposite approach reveals that {idea_text[:40]}... "
                                f"could be enhanced by addressing these inverse concerns.]",
                'technique': 'Reverse Brainstorming',
                'stimulus': prompt,
                'reasoning': 'Identifying what NOT to do reveals critical success factors '
                           'and highlights potential pitfalls to avoid.'
            }
            variations.append(variation)
        
        return {
            'method_used': 'Reverse Brainstorming',
            'description': 'Inverts the problem to reveal hidden insights and constraints',
            'generated_ideas': variations
        }


# API Endpoints

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint with system status"""
    try:
        ideas_count = ideas_collection.count_documents({}) if ideas_collection is not None else 0
        mongo_status = "connected" if db is not None else "disconnected"
    except:
        ideas_count = 0
        mongo_status = "error"
    
    with state_lock:
        active_count = len(application_state['active_users'])
    
    return jsonify({
        'status': 'healthy',
        'model_loaded': 'Mocked',
        'database': mongo_status,
        'stored_ideas_count': ideas_count,
        'active_users_count': active_count,
        'timestamp': datetime.utcnow().isoformat()
    }), 200


@app.route('/api/submit_idea', methods=['POST'])
def submit_idea():
    """Submit a new idea to the brainstorming session"""
    try:
        if ideas_collection is None:
            return jsonify({
                'success': False,
                'error': 'Database not connected. Please ensure MongoDB is running.'
            }), 503
        
        data = request.get_json()
        
        if not data or 'idea_text' not in data or 'username' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing required fields: idea_text and username'
            }), 400
        
        idea_text = data['idea_text'].strip()
        username = data['username'].strip()
        
        if not idea_text or not username:
            return jsonify({
                'success': False,
                'error': 'idea_text and username cannot be empty'
            }), 400
        
        # Generate unique ID and embedding
        idea_id = str(uuid.uuid4())
        embedding = MockCognitiveDiversityEngine.generate_embedding(idea_text)
        timestamp = datetime.utcnow().isoformat()
        
        # Create idea object
        idea = {
            'id': idea_id,
            'text': idea_text,
            'username': username,
            'timestamp': timestamp,
            'embedding': embedding
        }
        
        # Store idea in MongoDB
        ideas_collection.insert_one(idea.copy())
        
        # Update active users in memory
        with state_lock:
            application_state['active_users'].add(username)
        
        # Get total ideas count for metrics
        ideas_count = ideas_collection.count_documents({})
        diversity_metrics = MockCognitiveDiversityEngine.calculate_diversity_metrics(ideas_count)
        
        # Broadcast to all connected clients
        socketio.emit('new_idea', {
            'idea': {
                'id': idea_id,
                'text': idea_text,
                'username': username,
                'timestamp': timestamp
            },
            'diversity_metrics': diversity_metrics
        }, namespace='/')
        
        return jsonify({
            'success': True,
            'idea_id': idea_id,
            'timestamp': timestamp,
            'diversity_metrics': diversity_metrics,
            'message': 'Idea submitted successfully'
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/generate_idea_variations', methods=['POST'])
def generate_idea_variations():
    """Generate creative variations of an idea using different techniques"""
    try:
        data = request.get_json()
        
        if not data or 'idea_text' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing required field: idea_text'
            }), 400
        
        idea_text = data['idea_text'].strip()
        
        if not idea_text:
            return jsonify({
                'success': False,
                'error': 'idea_text cannot be empty'
            }), 400
        
        # Generate variations
        variations_result = IdeaVariationGenerator.generate_variations(idea_text)
        
        return jsonify({
            'success': True,
            'original_idea': idea_text,
            'method_used': variations_result['method_used'],
            'description': variations_result['description'],
            'generated_ideas': variations_result['generated_ideas'],
            'timestamp': datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# SocketIO Event Handlers

@socketio.on('connect', namespace='/')
def handle_connect():
    """Handle client connection - send current state"""
    print(f"Client connected: {request.sid}")
    
    try:
        # Prepare ideas without embeddings for transmission
        ideas_to_send = []
        if ideas_collection is not None:
            for idea in ideas_collection.find().sort('timestamp', -1):
                ideas_to_send.append({
                    'id': idea['id'],
                    'text': idea['text'],
                    'username': idea['username'],
                    'timestamp': idea['timestamp']
                })
        
        with state_lock:
            ideas_count = len(ideas_to_send)
            state_snapshot = {
                'ideas': ideas_to_send,
                'active_users': list(application_state['active_users']),
                'diversity_metrics': MockCognitiveDiversityEngine.calculate_diversity_metrics(ideas_count)
            }
        
        emit('initial_state', state_snapshot)
    except Exception as e:
        print(f"Error in handle_connect: {e}")
        emit('initial_state', {
            'ideas': [],
            'active_users': [],
            'diversity_metrics': {
                'fluency': 0,
                'flexibility': 0,
                'originality': 0.0,
                'elaboration': 0.0
            }
        })


@socketio.on('disconnect', namespace='/')
def handle_disconnect():
    """Handle client disconnection"""
    print(f"Client disconnected: {request.sid}")
    
    # Optionally remove user from active users
    with state_lock:
        if request.sid in application_state['session_to_user']:
            username = application_state['session_to_user'][request.sid]
            del application_state['session_to_user'][request.sid]


@socketio.on('register_user', namespace='/')
def handle_register_user(data):
    """Register a user with their session"""
    if 'username' in data:
        with state_lock:
            application_state['session_to_user'][request.sid] = data['username']
            application_state['active_users'].add(data['username'])
        
        socketio.emit('user_joined', {
            'username': data['username'],
            'active_users': list(application_state['active_users'])
        }, namespace='/')


# Root endpoint
@app.route('/')
def index():
    """Root endpoint with API information"""
    return jsonify({
        'project': 'Project Kaleidoscope',
        'version': '1.0.0',
        'description': 'AI-Powered Ideation and Brainstorming Platform',
        'endpoints': {
            'health': '/api/health',
            'submit_idea': '/api/submit_idea',
            'generate_variations': '/api/generate_idea_variations'
        },
        'websocket': 'Available at / namespace'
    })


if __name__ == '__main__':
    print("=" * 60)
    print("Project Kaleidoscope - Backend Server")
    print("=" * 60)
    print("Starting Flask-SocketIO server...")
    print("API available at: http://localhost:5000")
    print("Health check: http://localhost:5000/api/health")
    print("=" * 60)
    
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, allow_unsafe_werkzeug=True)
