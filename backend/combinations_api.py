#!/usr/bin/env python3
"""
Idea Combinations API - Port 8002
Handles idea merging, variations, and principle extraction
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Storage
combinations = []
variations = []

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "Idea Combinations",
        "port": 8002,
        "timestamp": datetime.utcnow().isoformat()
    })

@app.route('/combine_ideas', methods=['POST'])
def combine_ideas():
    try:
        data = request.get_json()
        idea1 = data.get('idea1', '')
        idea2 = data.get('idea2', '')
        
        # Generate creative combination
        combination = {
            "id": len(combinations),
            "idea1": idea1,
            "idea2": idea2,
            "combined": f"Hybrid: {idea1[:30]}... + {idea2[:30]}... = Revolutionary synergy",
            "strength": round(random.uniform(0.7, 0.95), 2),
            "timestamp": datetime.utcnow().isoformat()
        }
        
        combinations.append(combination)
        
        return jsonify({
            "success": True,
            "combination": combination
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate_variations', methods=['POST'])
def generate_variations():
    try:
        data = request.get_json()
        idea_text = data.get('idea_text', '')
        count = data.get('count', 3)
        
        # Generate variations
        generated = []
        for i in range(min(count, 5)):
            generated.append({
                "id": len(variations) + i,
                "original": idea_text,
                "variation": f"Variation {i+1}: {idea_text} reimagined from different angle",
                "creativity_score": round(random.uniform(0.6, 0.9), 2),
                "timestamp": datetime.utcnow().isoformat()
            })
        
        variations.extend(generated)
        
        return jsonify({
            "success": True,
            "variations": generated
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/extract_principles', methods=['POST'])
def extract_principles():
    try:
        data = request.get_json()
        idea_text = data.get('idea_text', '')
        
        principles = [
            "User-centric design",
            "Scalability focus",
            "Innovation through simplicity",
            "Sustainable approach"
        ]
        
        return jsonify({
            "success": True,
            "idea": idea_text,
            "principles": random.sample(principles, min(3, len(principles))),
            "timestamp": datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_combinations', methods=['GET'])
def get_combinations():
    return jsonify({
        "combinations": combinations,
        "total": len(combinations)
    })

if __name__ == '__main__':
    print("🔗 Idea Combinations API starting on port 8002...")
    app.run(host='0.0.0.0', port=8002, debug=False)
