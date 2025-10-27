# Vercel Production Deployment Troubleshooting Guide

## Issue: "No Production Deployment - Domain Not Serving Traffic"

This error occurs when Vercel cannot route traffic to your backend. Common causes and solutions:

---

## ✅ Step 1: Fix Backend Configuration

Your `backend/vercel.json` has been updated to properly configure serverless functions:

```json
{
  "buildCommand": "pip install -r requirements.txt",
  "devCommand": "python3 humanoid_api.py",
  "installCommand": "pip install -r requirements.txt",
  "functions": {
    "api/**/*.py": {
      "runtime": "python3.11",
      "maxDuration": 60
    }
  },
  "routes": [
    {
      "src": "/api/?(.*)",
      "dest": "/api/index.py"
    },
    {
      "src": "/(.*)",
      "dest": "/api/index.py"
    }
  ],
  "env": {
    "MONGODB_URI": "@MONGODB_URI",
    "FLASK_ENV": "production"
  }
}
```

Key changes:
- Added explicit `routes` configuration (Vercel routing)
- Created `/api/index.py` as serverless entry point
- Updated `humanoid_api.py` to read `MONGODB_URI` from environment

---

## ✅ Step 2: Verify Files Are in Place

Check that these files exist:

```bash
backend/
├── api/
│   ├── index.py          ← NEW MAIN ENTRY POINT
│   ├── health.py
│   ├── submit_idea.py
│   └── variations.py
├── humanoid_api.py       ← Flask app (imported by index.py)
├── requirements.txt
├── vercel.json          ← Updated routing
└── .vercelignore
```

---

## ✅ Step 3: Push Changes to GitHub

All files have been updated. Commit and push:

```bash
git add backend/vercel.json backend/api/index.py backend/humanoid_api.py
git commit -m "🔧 Fix Vercel serverless routing for production deployment"
git push origin main
```

---

## ✅ Step 4: Redeploy on Vercel

### Option A: Automatic Redeploy (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your **backend project**
3. Go to **Deployments** tab
4. Click the three dots (⋯) on the latest deployment
5. Select **"Redeploy"**
6. Wait for deployment to complete

### Option B: Force New Deployment
1. Click **"Deploy"** button in Vercel dashboard
2. Or commit any small change to trigger auto-deploy:
   ```bash
   echo "# Deployment fix" >> backend/README.md
   git add backend/README.md
   git commit -m "Trigger redeployment"
   git push origin main
   ```

---

## ✅ Step 5: Verify Environment Variables are Set

**Very Important:** Ensure these are configured:

1. Go to Vercel Dashboard → Backend Project
2. Click **Settings** → **Environment Variables**
3. Verify these exist (if not, add them):
   - [ ] `MONGODB_URI` = `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/kaleidoscope`
   - [ ] `FLASK_ENV` = `production`

If you just added variables, you **MUST redeploy** for them to take effect.

---

## ✅ Step 6: Test the Deployment

After redeployment completes:

### Test 1: Health Check
```bash
curl https://your-backend-project.vercel.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "stored_ideas_count": 0
}
```

### Test 2: Root Path
```bash
curl https://your-backend-project.vercel.app/
```

Should return a 200 response (not 404 or timeout).

### Test 3: Submit Idea
```bash
curl -X POST https://your-backend-project.vercel.app/api/submit_idea \
  -H "Content-Type: application/json" \
  -d '{"idea_text": "test idea", "username": "test_user"}'
```

---

## 🔍 Troubleshooting

### Issue: "502 Bad Gateway"
**Solution:**
- Recheck environment variables are set correctly
- Make sure `MONGODB_URI` is correct and database is accessible
- Check Vercel deployment logs: Deployments → Click deployment → Logs tab

### Issue: "404 Not Found"
**Solution:**
- Verify `/api/index.py` exists in repository
- Verify `backend/vercel.json` has correct routes
- Redeploy after checking files

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Verify `MONGODB_URI` environment variable is set
- Check MongoDB Atlas Network Access includes `0.0.0.0/0`
- Test connection string locally first before deploying

### Issue: "Timeout"
**Solution:**
- Increase `maxDuration` in `vercel.json` to 60 seconds (already done)
- Check if MongoDB is responding slowly
- Look at Vercel logs for what's taking time

### Issue: Still showing "No Production Deployment"
**Solution:**
- Wait 5-10 minutes after redeployment
- Hard refresh your browser (Ctrl+Shift+R)
- Try a different browser
- Check Vercel project settings → Domains are configured correctly

---

## 📋 Deployment Checklist

- [ ] Pull latest changes: `git pull origin main`
- [ ] Verify `/api/index.py` exists
- [ ] Verify `humanoid_api.py` imports `os` module
- [ ] Verify `backend/vercel.json` has `routes` section
- [ ] Go to Vercel Dashboard
- [ ] Select backend project
- [ ] Check Settings → Environment Variables (MONGODB_URI, FLASK_ENV)
- [ ] Go to Deployments
- [ ] Click "Redeploy" on latest deployment
- [ ] Wait for deployment status to turn green ✓
- [ ] Test `/api/health` endpoint
- [ ] Update frontend VITE_API_URL to new backend URL (if different)
- [ ] Redeploy frontend
- [ ] Test full flow in browser

---

## 📚 Key Concepts

### Why We Need /api/index.py
- Vercel serverless functions require an entry point
- `index.py` imports Flask app from `humanoid_api.py`
- All routes are funneled through this handler

### Routes vs Rewrites
- **Routes**: Direct traffic to specific handlers (what we use now)
- **Rewrites**: Transparently serve content (old approach, didn't work)

### Environment Variables
- `MONGODB_URI`: Connection string for database (must be set in Vercel UI)
- `FLASK_ENV`: Set to "production" for Flask optimizations
- Both must be set BEFORE deployment takes effect

---

## 🎯 Success Indicators

Your deployment is working when:
- ✅ `/api/health` returns `{"status": "healthy", "database": "connected"}`
- ✅ `/api/submit_idea` accepts POST requests
- ✅ Frontend chatbot shows diversity metrics
- ✅ No errors in browser console
- ✅ Ideas are persisted in MongoDB

---

## 📞 Need Help?

1. **Check Vercel Logs**: Deployments → [deployment] → Logs
2. **Test Locally First**: `python backend/humanoid_api.py`
3. **Verify MongoDB**: Check database is running and accessible
4. **Read Error Messages**: They usually indicate the exact problem

### Common Error Messages:

| Error | Solution |
|-------|----------|
| `ModuleNotFoundError: No module named 'humanoid_api'` | Ensure `/api/index.py` is in correct directory |
| `ConnectionRefusedError: MongoDB` | Set `MONGODB_URI` environment variable |
| `TimeoutError` | Increase `maxDuration` in `vercel.json` |
| `ImportError: flask` | Ensure `requirements.txt` includes all dependencies |
