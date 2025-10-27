"""
Vercel Serverless Function - Health Check
"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(__file__))

from humanoid_api import app

def handler(request):
    """Handle HTTP requests for Vercel"""
    with app.test_client() as client:
        return client.get('/api/health')

# Export for Vercel
handler.__name__ = 'api_handler'
