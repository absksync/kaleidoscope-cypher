#!/usr/bin/env python3
"""
Diversity Meter API - Port 8003
Handles cognitive diversity scoring and analysis
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from datetime import datetime
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Storage
diversity_scores = []

def calculate_diversity(idea_text):
    """Calculate multi-dimensional diversity score"""
    words = re.findall(r'\w+', idea_text.lower())
    unique_words = set(words)
    
    # Multi-dimensional scoring
    semantic_score = min(len(unique_words) / max(len(words), 1), 1.0)
    complexity_score = min(len(idea_text) / 200, 1.0)
    keyword_diversity = len(unique_words) / max(len(words), 1)
    
    combined_score = (semantic_score * 0.4 + complexity_score * 0.3 + keyword_diversity * 0.3)
    
    # Determine grade
    if combined_score >= 0.8:
        grade = "A - Excellent"
    elif combined_score >= 0.6:
        grade = "B - Good"
    elif combined_score >= 0.4:
        grade = "C - Average"
    else:
        grade = "D - Needs Improvement"
    
    return {
        "semantic_diversity": round(semantic_score, 3),
        "complexity_score": round(complexity_score, 3),
        "keyword_diversity": round(keyword_diversity, 3),
        "combined_score": round(combined_score, 3),
        "grade": grade,
        "unique_concepts": len(unique_words),
        "total_words": len(words)
    }

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "Diversity Meter",
        "port": 8003,
        "timestamp": datetime.utcnow().isoformat()
    })

@app.route('/analyze_diversity', methods=['POST'])
def analyze_diversity():
    try:
        data = request.get_json()
        idea_text = data.get('idea_text', '')
        
        if not idea_text:
            return jsonify({"error": "idea_text is required"}), 400
        
        analysis = calculate_diversity(idea_text)
        analysis['idea_text'] = idea_text
        analysis['timestamp'] = datetime.utcnow().isoformat()
        
        diversity_scores.append(analysis)
        
        return jsonify({
            "success": True,
            "analysis": analysis
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/analyze_batch', methods=['POST'])
def analyze_batch():
    try:
        data = request.get_json()
        ideas = data.get('ideas', [])
        
        results = []
        for idea in ideas:
            analysis = calculate_diversity(idea)
            analysis['idea_text'] = idea
            results.append(analysis)
        
        return jsonify({
            "success": True,
            "results": results,
            "count": len(results)
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/diversity_leaderboard', methods=['GET'])
def diversity_leaderboard():
    sorted_scores = sorted(diversity_scores, key=lambda x: x['combined_score'], reverse=True)
    
    return jsonify({
        "leaderboard": sorted_scores[:10],
        "total_analyzed": len(diversity_scores)
    })

if __name__ == '__main__':
    print("📊 Diversity Meter API starting on port 8003...")
    app.run(host='0.0.0.0', port=8003, debug=False)
