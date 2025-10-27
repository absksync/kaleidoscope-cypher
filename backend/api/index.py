"""
Vercel Serverless Handler for Kaleidoscope Backend
Routes all requests to the Flask app
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from humanoid_api import app

# Vercel requires the app to be exported as 'app'
# This file acts as the entry point for serverless functions
