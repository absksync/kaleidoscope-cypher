# Kaleidoscope Cypher

AI-powered collaborative platform to foster innovation by measuring and unlocking diversity of thought in teams. Features real-time idea diversity analytics, gamified collaboration, AI-generated creative prompts, mind map visualization, badges, and leaderboards.

## 🌟 Features

- **Idea Submission**: Team members can submit ideas across multiple categories
- **Real-time Diversity Analytics**: Track how diverse your team's thinking is in real-time
- **AI-Generated Creative Prompts**: Get inspired with AI-powered creative thinking prompts
- **Mind Map Visualization**: See connections between ideas and categories in an interactive mind map
- **Gamification**: Earn badges and compete on leaderboards
- **Real-time Updates**: WebSocket-powered real-time synchronization across all users

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **ReactFlow** - Mind map visualization
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Flask** - Python web framework
- **Flask-SocketIO** - Real-time WebSocket support
- **SentenceTransformers** - Semantic similarity analysis for diversity calculation
- **OpenAI API** - AI-generated creative prompts (optional)
- **scikit-learn** - Machine learning utilities

## 📋 Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- npm or yarn

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. (Optional) Create a `.env` file for OpenAI integration:
```bash
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

5. Run the Flask server:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create environment configuration:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🎮 How to Use

1. **Submit Ideas**: Click on "Submit Idea" tab to add your ideas with a title, category, and description
2. **View Analytics**: Check the Dashboard to see diversity metrics and category distribution
3. **Explore Mind Map**: Navigate to the Mind Map tab to visualize idea connections
4. **Get Inspired**: Use the AI Prompts tab to get creative thinking prompts
5. **Track Progress**: Monitor your badges and leaderboard position

## 🏆 Gamification

### Points System
- Submit an idea: **+10 points**
- Highly diverse idea: **+20 points**
- Unique category: **+15 points**

### Badges
- **First Steps**: Submit your first idea
- **Idea Machine**: Submit 10 ideas
- **Diversity Champion**: Achieve 80% diversity score
- **Category Explorer**: Submit ideas in 3+ categories
- **Points Collector**: Earn 100 points
- **Team Player**: Collaborate with 5+ team members

## 📊 Diversity Calculation

The platform uses **SentenceTransformers** to calculate semantic similarity between ideas:
1. Ideas are encoded into vector embeddings
2. Cosine similarity is calculated between all idea pairs
3. Diversity score = (1 - average_similarity) × 100
4. Higher scores indicate more diverse thinking

## 🔧 API Endpoints

- `GET /api/ideas` - Fetch all ideas
- `POST /api/ideas` - Submit a new idea
- `GET /api/diversity` - Get diversity metrics
- `GET /api/leaderboard` - Get leaderboard data
- `GET /api/prompts` - Get AI-generated creative prompts

## 🌐 WebSocket Events

- `new_idea` - Broadcasted when a new idea is submitted
- `diversity_update` - Broadcasted when diversity metrics change

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- SentenceTransformers for semantic analysis
- OpenAI for creative AI capabilities
- React Flow for mind map visualization
- Recharts for beautiful data visualization
