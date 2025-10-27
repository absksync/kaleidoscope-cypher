"""
Vercel Serverless Function - Generate Variations
"""
import sys
import os
import json

# Add parent directory to path
sys.path.insert(0, os.path.dirname(__file__))

from humanoid_api import app

def handler(request):
    """Handle HTTP requests for Vercel"""
    if request.method == 'POST':
        with app.test_client() as client:
            data = json.loads(request.body) if request.body else {}
            return client.post('/api/generate_idea_variations', json=data)
    elif request.method == 'GET':
        with app.test_client() as client:
            return client.get('/api/generate_idea_variations')

# Export for Vercel
handler.__name__ = 'api_handler'
