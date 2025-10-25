# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                           │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              React Frontend (Vite)                          │ │
│  │              Port: 5175                                     │ │
│  │                                                             │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │           Components Layer                            │  │ │
│  │  │  • LandingPage.jsx (Live Ideas Feed)                 │  │ │
│  │  │  • IdeaVariationGenerator.jsx (AI Variations)        │  │ │
│  │  │  • DiversityMeter.jsx                                │  │ │
│  │  │  • GamifiedCollaboration.jsx                         │  │ │
│  │  │  • MindMapVisualization.jsx                          │  │ │
│  │  │  • SWOTEvaluation.jsx                                │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                           │                                 │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │          Services Layer                               │  │ │
│  │  │  • api.js (REST API calls)                           │  │ │
│  │  │  • websocket.js (Socket.IO client)                   │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                             │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │         Authentication Layer                          │  │ │
│  │  │  • Clerk (User Management)                           │  │ │
│  │  │  • @clerk/clerk-react                                │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP/HTTPS
                           │ WebSocket
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND SERVER                               │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │           Flask Application                                │ │
│  │           Port: 5000                                       │ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │              REST API Layer                           │ │ │
│  │  │  • GET  /api/health                                  │ │ │
│  │  │  • POST /api/submit_idea                             │ │ │
│  │  │  • POST /api/generate_idea_variations                │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                           │                                │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │          WebSocket Layer (Socket.IO)                  │ │ │
│  │  │  • connect → initialState                            │ │ │
│  │  │  • new_idea → broadcast to all clients               │ │ │
│  │  │  • register_user → session tracking                  │ │ │
│  │  │  • user_joined → notify clients                      │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                           │                                │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │           Business Logic Layer                        │ │ │
│  │  │  • MockCognitiveDiversityEngine                      │ │ │
│  │  │    - 384-dimensional embeddings                      │ │ │
│  │  │    - Diversity metrics calculation                   │ │ │
│  │  │  • IdeaVariationGenerator                            │ │ │
│  │  │    - Random Word Association                         │ │ │
│  │  │    - Reverse Brainstorming                           │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                           │
                           │ PyMongo
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MongoDB Database                            │
│                      Port: 27017                                 │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │           Collections                                       │ │
│  │  • ideas (id, text, username, timestamp, embedding)        │ │
│  │  • active_users (session tracking)                         │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### 1. Idea Submission Flow

```
User enters idea
      ↓
LandingPage Component
      ↓
api.submitIdea(text, username) ────────┐
                                        │ HTTP POST
                                        ↓
                            Backend: /api/submit_idea
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ↓                   ↓                   ↓
            Generate Embedding   Save to MongoDB   Calculate Metrics
                    │                   │                   │
                    └───────────────────┼───────────────────┘
                                        │
                            Broadcast via WebSocket
                                        │
                    ┌───────────────────┼───────────────────┐
                    ↓                   ↓                   ↓
                Client 1            Client 2            Client N
                    │                   │                   │
                    ↓                   ↓                   ↓
            Update UI in Real-time  (All clients see new idea instantly)
```

### 2. Idea Variation Generation Flow

```
User enters base idea
      ↓
IdeaVariationGenerator Component
      ↓
api.generateIdeaVariations(text) ──────┐
                                        │ HTTP POST
                                        ↓
                    Backend: /api/generate_idea_variations
                                        │
                    ┌───────────────────┴───────────────────┐
                    │                                       │
                    ↓                                       ↓
        Random Word Association                  Reverse Brainstorming
    (Combine with random concepts)              (Invert the problem)
                    │                                       │
                    └───────────────────┬───────────────────┘
                                        │
                            Return 3 variations with:
                            • variation_text
                            • technique
                            • stimulus
                            • reasoning
                                        │
                                        ↓
                        IdeaVariationGenerator Component
                                        │
                                        ↓
                            Display variations in UI
```

### 3. Real-time Collaboration Flow

```
New User Connects
      ↓
WebSocket.connect(username)
      │
      ├──> Backend: Socket.IO 'connect' event
      │                  │
      │                  ↓
      │         Fetch all ideas from MongoDB
      │                  │
      │                  ↓
      ├───< emit('initialState', { ideas, metrics, users })
      │
      ↓
Display existing ideas and metrics

When ANY user submits idea:
      │
      ↓
Backend saves to DB
      │
      ↓
Backend broadcasts to ALL connected clients
      │
      ├──> Client 1: new_idea event
      ├──> Client 2: new_idea event  
      └──> Client N: new_idea event
               │
               ↓
      All UIs update simultaneously
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                              │
├─────────────────────────────────────────────────────────┤
│ Framework:        React 19.1.1                          │
│ Build Tool:       Vite 7.1.12                           │
│ Styling:          Tailwind CSS 4.1.16                   │
│ Routing:          React Router DOM 7.9.4                │
│ Auth:             Clerk (@clerk/clerk-react)            │
│ WebSocket:        Socket.IO Client                      │
│ State:            React Hooks (useState, useEffect)     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    BACKEND                               │
├─────────────────────────────────────────────────────────┤
│ Framework:        Flask 3.0.0                           │
│ WebSocket:        Flask-SocketIO 5.3.5                  │
│ CORS:             Flask-CORS 4.0.0                      │
│ Database Driver:  PyMongo 4.6.1                         │
│ Server:           Werkzeug (Development)                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    DATABASE                              │
├─────────────────────────────────────────────────────────┤
│ Database:         MongoDB 7.0+                          │
│ Connection:       mongodb://localhost:27017             │
│ Collections:      ideas, active_users                   │
└─────────────────────────────────────────────────────────┘
```

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                  Cloud Deployment                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Frontend:  Vercel / Netlify / AWS S3 + CloudFront      │
│             (Static React Build)                         │
│                         │                                │
│                         ↓                                │
│  Backend:   Heroku / Railway / AWS EC2 / DigitalOcean   │
│             (Flask + Gunicorn + Nginx)                   │
│                         │                                │
│                         ↓                                │
│  Database:  MongoDB Atlas (Cloud)                        │
│             (Managed MongoDB Service)                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Security Considerations

```
┌─────────────────────────────────────────────────────────┐
│                   Authentication                         │
├─────────────────────────────────────────────────────────┤
│ • Clerk handles all user authentication                 │
│ • JWT tokens for API requests (future)                  │
│ • Secure session management                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      API Security                        │
├─────────────────────────────────────────────────────────┤
│ • CORS configured for specific origins                  │
│ • Input validation on all endpoints                     │
│ • Rate limiting (to be implemented)                     │
│ • HTTPS in production (to be implemented)               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   Database Security                      │
├─────────────────────────────────────────────────────────┤
│ • MongoDB authentication (to be enabled)                │
│ • Network isolation                                     │
│ • Regular backups                                       │
│ • Data encryption at rest (production)                  │
└─────────────────────────────────────────────────────────┘
```

---

For more details, see:
- [INTEGRATION.md](./INTEGRATION.md) - Integration details
- [README.md](./README.md) - Full documentation
- [QUICKSTART.md](./QUICKSTART.md) - Quick setup guide
