#!/usr/bin/env python3
"""
Collaboration & Gamification API - Port 8004
Handles team collaboration, achievements, and leaderboards
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import random

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Storage
sessions = {}
team_ideas = []
activities = []
leaderboard = [
    {"username": "InnovatorPro", "score": 1250, "ideas": 15, "badges": 3},
    {"username": "CreativeMind", "score": 980, "ideas": 12, "badges": 2},
    {"username": "IdeaGuru", "score": 850, "ideas": 10, "badges": 2},
    {"username": "ThinkTank", "score": 720, "ideas": 8, "badges": 1},
]

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "Collaboration & Gamification",
        "port": 8004,
        "timestamp": datetime.utcnow().isoformat()
    })

@app.route('/join_session', methods=['POST'])
def join_session():
    try:
        data = request.get_json()
        username = data.get('username', 'Anonymous')
        session_id = data.get('session_id', 'default_session')
        
        if session_id not in sessions:
            sessions[session_id] = {
                "id": session_id,
                "users": [],
                "created_at": datetime.utcnow().isoformat()
            }
        
        if username not in sessions[session_id]['users']:
            sessions[session_id]['users'].append(username)
        
        activities.append({
            "type": "user_joined",
            "username": username,
            "session_id": session_id,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        return jsonify({
            "success": True,
            "session": sessions[session_id],
            "active_users": len(sessions[session_id]['users'])
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/submit_team_idea', methods=['POST'])
def submit_team_idea():
    try:
        data = request.get_json()
        idea_text = data.get('idea_text', '')
        username = data.get('username', 'Anonymous')
        session_id = data.get('session_id', 'default_session')
        
        idea = {
            "id": len(team_ideas),
            "idea_text": idea_text,
            "username": username,
            "session_id": session_id,
            "votes": 0,
            "comments": [],
            "timestamp": datetime.utcnow().isoformat()
        }
        
        team_ideas.append(idea)
        
        activities.append({
            "type": "idea_submitted",
            "username": username,
            "idea_preview": idea_text[:50] + "...",
            "timestamp": datetime.utcnow().isoformat()
        })
        
        return jsonify({
            "success": True,
            "idea": idea,
            "points_earned": 50
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    return jsonify({
        "leaderboard": leaderboard,
        "last_updated": datetime.utcnow().isoformat()
    })

@app.route('/activities', methods=['GET'])
def get_activities():
    return jsonify({
        "activities": activities[-20:],  # Last 20 activities
        "total": len(activities)
    })

@app.route('/vote_idea/<int:idea_id>', methods=['POST'])
def vote_idea(idea_id):
    try:
        if idea_id >= len(team_ideas):
            return jsonify({"error": "Idea not found"}), 404
        
        team_ideas[idea_id]['votes'] += 1
        
        activities.append({
            "type": "idea_voted",
            "idea_id": idea_id,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        return jsonify({
            "success": True,
            "idea": team_ideas[idea_id]
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🎮 Collaboration & Gamification API starting on port 8004...")
    app.run(host='0.0.0.0', port=8004, debug=False)
