# Kaleidoscope Cypher 🎨

**AI-Powered Brainstorming & Idea Generation Platform**

A full-stack collaborative brainstorming platform that uses AI-powered creativity techniques to generate and diversify ideas in real-time. Built with React, Flask, and MongoDB.

## 🌟 Features

- **Real-time Collaboration** - WebSocket-powered live idea sharing
- **AI Idea Variations** - Generate creative variations using Random Word Association and Reverse Brainstorming
- **Diversity Metrics** - Track fluency, flexibility, originality, and elaboration of ideas
- **Gamified Collaboration** - Interactive brainstorming tools
- **Mind Map Visualization** - Visual idea organization
- **SWOT Evaluation** - Structured idea analysis
- **Clerk Authentication** - Secure user management

## 🚀 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server  
- **Tailwind CSS 4** - Styling
- **React Router DOM** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **Clerk** - Authentication

### Backend
- **Flask** - Python web framework
- **Flask-SocketIO** - WebSocket support
- **MongoDB** - Database for idea persistence
- **PyMongo** - MongoDB driver

## � Project Structure

```
Kaleidoscope_Cypher/
├── backend/                      # Flask backend
│   ├── humanoid_api.py          # Main API server
│   ├── requirements.txt         # Python dependencies
│   └── README.md                # Backend documentation
├── src/
│   ├── components/              # React components
│   │   ├── LandingPage.jsx     # Main landing page with live feed
│   │   ├── IdeaVariationGenerator.jsx  # AI variation tool
│   │   ├── DiversityMeter.jsx
│   │   ├── GamifiedCollaboration.jsx
│   │   ├── MindMapVisualization.jsx
│   │   └── SWOTEvaluation.jsx
│   ├── services/                # API & WebSocket services
│   │   ├── api.js              # REST API service
│   │   └── websocket.js        # WebSocket service
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── logo.png
├── .env.example
└── package.json
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- MongoDB
- Clerk account (for authentication)

### 1. Clone the Repository

```bash
git clone https://github.com/absksync/kaleidoscope-cypher.git
cd kaleidoscope-cypher
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your Clerk key to .env
# VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
# VITE_API_URL=http://localhost:5000

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5175`

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start MongoDB (choose one method):
# Method 1: System service
sudo systemctl start mongod

# Method 2: Docker
docker run -d -p 27017:27017 --name kaleidoscope-mongo mongo:latest

# Start Flask server
python humanoid_api.py
```

Backend will run on `http://localhost:5000`

## 🔐 Clerk Authentication Setup

1. Sign up at [https://clerk.com](https://clerk.com)
2. Create a new application
3. Get your Publishable Key from the API Keys page
4. Add it to `.env`:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

📚 For detailed instructions, see [CLERK_SETUP.md](./CLERK_SETUP.md)

## � API Endpoints

### REST API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Backend health check and stats |
| `/api/submit_idea` | POST | Submit a new brainstorming idea |
| `/api/generate_idea_variations` | POST | Generate AI-powered idea variations |

### WebSocket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `connect` | Server → Client | Initial state with all ideas |
| `new_idea` | Server → Client | Real-time new idea broadcast |
| `register_user` | Client → Server | Register username for session |
| `user_joined` | Server → Client | User joined notification |

## 🎯 Usage

### Submitting Ideas

1. Sign in using Clerk authentication
2. Enter your idea in the chat box on the landing page
3. Click "Submit Idea"
4. Watch it appear in real-time in the Live Ideas Feed

### Generating Idea Variations

1. Navigate to "Idea Variation Generator"
2. Enter your base idea
3. Click "Generate Variations"
4. Explore AI-generated creative variations using:
   - **Random Word Association** - Combines unrelated concepts
   - **Reverse Brainstorming** - Inverts the problem for insights

### Diversity Metrics

The platform tracks:
- **Fluency** - Total number of ideas
- **Flexibility** - Number of different idea categories
- **Originality** - Uniqueness score (0-1)
- **Elaboration** - Detail and depth score (0-1)

## 🧪 Development

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend  
python humanoid_api.py --debug  # Run with debug mode
```

## 🐳 Docker Support (Optional)

```bash
# Run MongoDB in Docker
docker run -d \
  --name kaleidoscope-mongo \
  -p 27017:27017 \
  -v kaleidoscope-data:/data/db \
  mongo:latest
```

## 📝 Environment Variables

### Frontend (.env)
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_API_URL=http://localhost:5000
```

### Backend (Optional)
```bash
MONGO_URI=mongodb://localhost:27017/
DB_NAME=kaleidoscope_db
FLASK_SECRET_KEY=kaleidoscope-secret-2025
```

## 🛠️ Available Scripts

### Development Server
```bash
npm run dev
```
Starts the development server at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist` folder

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally

### Lint Code
```bash
npm run lint
```
Run ESLint to check code quality

## 🌐 Development Server

The development server is currently running at:
- **Local**: http://localhost:5173/
- **Network**: Use `npm run dev -- --host` to expose on network

## 📁 Project Structure

```
Kaleidoscope_Cypher/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles with Tailwind
├── index.html          # HTML template
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
└── postcss.config.js   # PostCSS configuration

```

## 🎨 Tailwind CSS

Tailwind CSS is configured and ready to use. The main configuration is in `tailwind.config.js`. You can customize:
- Colors
- Spacing
- Typography
- Breakpoints
- And much more!

## 🔧 Configuration Files

- **vite.config.js** - Vite build configuration
- **tailwind.config.js** - Tailwind CSS customization
- **postcss.config.js** - PostCSS plugins configuration
- **package.json** - Project metadata and dependencies

## 📝 Next Steps

1. Start building your components in the `src` folder
2. Add routing with React Router DOM
3. Create API calls using Axios
4. Customize Tailwind theme in `tailwind.config.js`
5. Add more dependencies as needed with `npm install <package-name>`

## 🚀 Deployment

When ready to deploy, build the project:
```bash
npm run build
```

The optimized files will be in the `dist` folder, ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Or any static hosting service

---

Happy coding! 🎉
