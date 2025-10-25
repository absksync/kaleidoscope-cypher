# 🚀 Quick Start Guide

Get Kaleidoscope Cypher up and running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Python 3.8+ installed (`python3 --version`)
- [ ] MongoDB installed or Docker for running MongoDB
- [ ] Clerk account (free at clerk.com)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your Clerk key
# VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

**Get your Clerk key:**
1. Go to [clerk.com](https://clerk.com)
2. Create an account and new application
3. Copy the Publishable Key from Dashboard → API Keys
4. Paste it in `.env`

### 3. Start MongoDB

Choose one method:

**Option A: System Service**
```bash
sudo systemctl start mongod
```

**Option B: Docker**
```bash
docker run -d -p 27017:27017 --name kaleidoscope-mongo mongo:latest
```

**Verify MongoDB is running:**
```bash
mongosh --eval "db.version()"
```

### 4. Launch the Application

**Easy Way (Recommended):**
```bash
./start.sh
```

**Manual Way:**
```bash
# Terminal 1 - Backend
cd backend
python3 humanoid_api.py

# Terminal 2 - Frontend
npm run dev
```

### 5. Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5175
- **Backend API:** http://localhost:5000/api/health

## Verification

1. ✅ You should see the landing page with a black background and blue accents
2. ✅ Backend status indicator should show "Backend Connected" (green dot)
3. ✅ Click "Sign Up" to create an account
4. ✅ Try submitting an idea in the chat box
5. ✅ Navigate to "Idea Variation Generator" and generate variations

## Troubleshooting

### Backend shows "Offline"
- Check if Python server is running on port 5000
- Verify MongoDB is running: `mongosh`
- Check backend logs for errors

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Check if port 27017 is in use
lsof -i :27017

# Restart MongoDB
sudo systemctl restart mongod
```

### Frontend Build Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5175 (frontend)
lsof -ti:5175 | xargs kill -9
```

## Next Steps

Once everything is running:

1. **Explore Features:**
   - Submit ideas via the landing page chat
   - Try the Idea Variation Generator
   - Test the Diversity Meter
   - Check out Mind Map Visualization

2. **Customize:**
   - Update logo in `public/logo.png`
   - Modify colors in component files
   - Add your own creativity techniques

3. **Deploy:**
   - See `DEPLOYMENT.md` for production deployment guide

## Need Help?

- 📖 Full documentation: [README.md](./README.md)
- 🔐 Clerk setup details: [CLERK_SETUP.md](./CLERK_SETUP.md)
- 🐛 Found a bug? Open an issue on GitHub
- 💬 Questions? Check the wiki

Happy Brainstorming! 🎨✨
