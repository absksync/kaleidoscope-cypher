#!/bin/bash
# Vercel Deployment Quick Commands

echo "🚀 Kaleidoscope Cypher - Vercel Deployment Helper"
echo "=================================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "📋 Deployment Options:"
echo "1. Deploy Backend to Vercel"
echo "2. Deploy Frontend to Vercel"
echo "3. Deploy Both (Backend then Frontend)"
echo "4. View Deployment Logs"
echo "5. Exit"
echo ""

read -p "Select option (1-5): " choice

case $choice in
    1)
        echo "🔧 Deploying Backend..."
        cd backend
        vercel --prod
        ;;
    2)
        echo "🎨 Deploying Frontend..."
        cd ..
        vercel --prod
        ;;
    3)
        echo "🚀 Deploying Backend..."
        cd backend
        vercel --prod
        BACKEND_URL=$(vercel env list --prod | grep VERCEL_URL)
        
        echo ""
        echo "✅ Backend deployed!"
        echo "Now update frontend VITE_API_URL environment variable"
        echo ""
        
        read -p "Enter backend URL (e.g., https://api-xxxx.vercel.app): " backend_url
        
        echo "🎨 Deploying Frontend..."
        cd ..
        vercel env add VITE_API_URL $backend_url --prod
        vercel --prod
        ;;
    4)
        echo "📊 Backend Logs:"
        cd backend
        vercel logs --prod
        ;;
    5)
        echo "Goodbye! 👋"
        exit 0
        ;;
    *)
        echo "Invalid option"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment complete!"
echo ""
echo "For detailed instructions, see VERCEL_DEPLOYMENT.md"
