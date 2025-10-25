# Kaleidoscope Cypher Backend

Flask-based backend API with real-time Socket.IO support for the Kaleidoscope brainstorming platform.

## Prerequisites

- Python 3.8+
- MongoDB (running on localhost:27017)

## Setup

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Start MongoDB:
```bash
# On Linux
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 mongo:latest
```

3. Run the backend server:
```bash
python humanoid_api.py
```

The server will start on http://localhost:5000

## API Endpoints

- `GET /api/health` - Health check and system status
- `POST /api/submit_idea` - Submit a new brainstorming idea
- `POST /api/generate_idea_variations` - Generate creative variations of an idea

## WebSocket Events

- `connect` - Receive initial state with all ideas
- `new_idea` - Real-time updates when ideas are submitted
- `register_user` - Register username for session tracking
