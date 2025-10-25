#!/bin/bash

# Kaleidoscope Cypher - Startup Script
# This script starts both the frontend and backend servers

echo "=================================="
echo "  Kaleidoscope Cypher Launcher"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if MongoDB is running
echo -e "${YELLOW}Checking MongoDB...${NC}"
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${RED}✗ MongoDB is not running${NC}"
    echo -e "${YELLOW}Starting MongoDB...${NC}"
    
    # Try to start MongoDB using systemctl
    if command -v systemctl &> /dev/null; then
        sudo systemctl start mongod
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ MongoDB started successfully${NC}"
        else
            echo -e "${RED}✗ Failed to start MongoDB${NC}"
            echo -e "${YELLOW}Please start MongoDB manually:${NC}"
            echo "  sudo systemctl start mongod"
            echo "  OR"
            echo "  docker run -d -p 27017:27017 mongo:latest"
            exit 1
        fi
    else
        echo -e "${YELLOW}Please start MongoDB manually before continuing${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ MongoDB is running${NC}"
fi

echo ""
echo -e "${YELLOW}Starting Basic Backend Server (Port 5000)...${NC}"
cd backend
python3 humanoid_api.py &
BACKEND_PID=$!
echo -e "${GREEN}✓ Basic Backend started (PID: $BACKEND_PID)${NC}"
echo "  API: http://localhost:5000"

echo ""
echo -e "${YELLOW}Starting AI Backend Server (Port 8001)...${NC}"
python3 kaleidoscope_unified_api.py &
AI_BACKEND_PID=$!
echo -e "${GREEN}✓ AI Backend started (PID: $AI_BACKEND_PID)${NC}"
echo "  AI API: http://localhost:8001"

cd ..
sleep 2

echo ""
echo -e "${YELLOW}Starting Frontend Server...${NC}"
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo "  App: http://localhost:5175"

echo ""
echo "=================================="
echo -e "${GREEN}All servers are running!${NC}"
echo "=================================="
echo ""
echo "Frontend:    http://localhost:5175"
echo "Backend:     http://localhost:5000"
echo "AI Backend:  http://localhost:8001"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Trap Ctrl+C and kill all processes
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $AI_BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Wait for all processes
wait $BACKEND_PID $AI_BACKEND_PID $FRONTEND_PID
