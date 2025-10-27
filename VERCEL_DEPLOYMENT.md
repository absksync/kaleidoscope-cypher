# Vercel Deployment Guide for Kaleidoscope Cypher

## 📋 Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **GitHub Account** - Already have your repo at https://github.com/absksync/kaleidoscope-cypher
3. **Environment Variables** - MongoDB URI and API URLs

## 🚀 Deployment Steps

### Step 1: Deploy Backend to Vercel

1. Go to https://vercel.com/new
2. Select "Other" → "Create Git Monorepo"
3. Import your GitHub repository
4. Configure the project:
   - **Framework**: Other
   - **Root Directory**: `./backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Output Directory**: (leave empty)
   - **Install Command**: `pip install -r requirements.txt`

5. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   FLASK_ENV=production
   ```

6. Click "Deploy"

**Backend URL**: Will be something like `https://your-project-api.vercel.app`

### Step 2: Deploy Frontend to Vercel

1. Go to https://vercel.com/new again
2. Import the same GitHub repository
3. Configure the project:
   - **Framework**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
   - **Output Directory**: `dist`

4. Add Environment Variables:
   ```
   VITE_API_URL=https://your-project-api.vercel.app
   ```
   (Use the backend URL from Step 1)

5. Click "Deploy"

**Frontend URL**: Will be something like `https://your-project.vercel.app`

### Step 3: Connect Backend and Frontend

After both are deployed:

1. Update frontend environment variable with backend URL
2. Test the chatbot at `https://your-project.vercel.app`
3. Open browser console (F12) to verify API calls

## 🔧 Backend Vercel Configuration

The backend uses serverless functions in the `/api` directory:
- `/api/health.py` - Health check endpoint
- `/api/submit_idea.py` - Submit idea with diversity metrics
- `/api/variations.py` - Generate creative variations

## 📦 What Gets Deployed

**Backend**:
- Python Flask API
- Serverless functions for each endpoint
- MongoDB connection (via MONGODB_URI)
- AI creativity algorithms

**Frontend**:
- React + Vite application
- Dark-themed chatbot with neon glow
- Diversity metrics display
- Creative variations showcase

## ✅ Testing Your Deployment

1. Open your frontend URL
2. Click the dark blue robot icon (bottom-right)
3. Type: "AI for sustainable energy"
4. Press Enter
5. Verify results show:
   - ✅ Analysis Complete!
   - 📊 Diversity metrics (4 dimensions)
   - 🎨 Creative variations (3 ideas)

## 🔒 Security Notes

- MongoDB URI should be kept secret (use Vercel environment variables)
- CORS is enabled for cross-origin requests
- API endpoints are protected and rate-limited

## 📝 MongoDB Setup (if not already done)

1. Create MongoDB Atlas cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Add IP whitelist for Vercel IPs
4. Use connection string as MONGODB_URI environment variable

## 🚨 Troubleshooting

**"Cannot connect to backend"**
- Verify VITE_API_URL is set correctly in frontend
- Check backend deployment status on Vercel
- Verify MongoDB connection string in backend env vars

**"Port already in use"**
- Vercel handles ports automatically, no action needed

**"Build fails"**
- Check build logs in Vercel dashboard
- Ensure all dependencies in requirements.txt
- Verify environment variables are set

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- GitHub Repo: https://github.com/absksync/kaleidoscope-cypher
- Issues: Create GitHub issue for bugs

## 🎉 Congratulations!

Your Kaleidoscope Cypher application is now live on Vercel!

**Share your deployment:**
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-project-api.vercel.app`
