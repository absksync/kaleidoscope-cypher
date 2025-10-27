# Vercel Environment Variables Setup Guide

## Problem: "Secret does not exist" Error

This occurs when `vercel.json` references environment variables with `@secret-name` syntax, but the secret hasn't been created in Vercel's project settings.

## Solution: Set Environment Variables in Vercel Dashboard

### For Backend Deployment (Python Flask)

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Select Your Backend Project**
   - Click on your backend project name

3. **Navigate to Settings → Environment Variables**

4. **Add MongoDB Connection String**
   - Click "Add New"
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/kaleidoscope?retryWrites=true&w=majority`
   - **Select Environment**: Production (check the box)
   - Click "Save"

5. **Add Flask Environment**
   - Click "Add New"
   - **Name**: `FLASK_ENV`
   - **Value**: `production`
   - **Select Environment**: Production
   - Click "Save"

6. **Redeploy**
   - Go to "Deployments"
   - Click the three dots on the latest deployment
   - Select "Redeploy"

### For Frontend Deployment (React)

1. **Select Your Frontend Project**
   - Click on your frontend project name

2. **Navigate to Settings → Environment Variables**

3. **Add Backend API URL**
   - Click "Add New"
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-project.vercel.app` (replace with actual backend URL)
   - **Select Environment**: Production
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments"
   - Click the three dots on the latest deployment
   - Select "Redeploy"

## Getting MongoDB Connection String

### If Using MongoDB Atlas:

1. Go to https://www.mongodb.com/cloud/atlas

2. Log in to your account

3. Go to your cluster → "Connect" button

4. Choose "Connect your application"

5. Select "Python" and version "3.6 and later"

6. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

7. Replace:
   - `<username>`: Your MongoDB username
   - `<password>`: Your MongoDB password
   - `<cluster>`: Your cluster name
   - `<database>`: Your database name (e.g., "kaleidoscope")

8. Make sure to whitelist `0.0.0.0/0` in Network Access for Vercel access

## Vercel Dashboard Steps (Visual Guide)

```
1. Vercel Dashboard
   ↓
2. Select Project (Backend)
   ↓
3. Settings tab
   ↓
4. Environment Variables (left sidebar)
   ↓
5. Add New Variable
   ├─ Name: MONGODB_URI
   ├─ Value: mongodb+srv://...
   └─ Production: ✓
   ↓
6. Save
   ↓
7. Go to Deployments
   ↓
8. Redeploy latest deployment
```

## Testing Environment Variables

After setting variables and redeploying:

1. Open your backend deployment URL: `https://your-backend.vercel.app`

2. Visit the health endpoint: `https://your-backend.vercel.app/api/health`

3. You should see:
   ```json
   {
     "status": "healthy",
     "database": "connected",
     "stored_ideas_count": 0
   }
   ```

If you see "database": "disconnected", the MONGODB_URI is incorrect.

## Common Issues

### Issue: "MONGODB_URI is undefined"
**Solution**: The variable wasn't saved in Vercel Settings. Go to Settings → Environment Variables and add it again.

### Issue: "MongoDB connection timeout"
**Solution**: 
- Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Check MongoDB connection string for typos
- Ensure password doesn't have special characters (or URL-encode them)

### Issue: "Database connection refused"
**Solution**:
- Make sure MongoDB cluster is running
- Check cluster status in MongoDB Atlas

## vercel.json Configuration

Your `backend/vercel.json` now references environment variables like this:

```json
{
  "env": {
    "MONGODB_URI": "@MONGODB_URI",
    "FLASK_ENV": "production"
  }
}
```

This tells Vercel: "Look for these variables in the Environment Variables settings, not as literal secrets"

## Summary

| Variable | Where to Set | Value |
|----------|-------------|-------|
| `MONGODB_URI` | Vercel → Backend → Settings → Environment Variables | `mongodb+srv://user:pass@cluster.mongodb.net/kaleidoscope` |
| `FLASK_ENV` | Vercel → Backend → Settings → Environment Variables | `production` |
| `VITE_API_URL` | Vercel → Frontend → Settings → Environment Variables | `https://your-backend.vercel.app` |

**After setting all variables, redeploy your projects!**
