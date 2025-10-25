# MongoDB Installation Guide

Kaleidoscope Cypher requires MongoDB for data persistence. Choose the best installation method for your system.

## Option 1: Docker (Recommended - Easiest)

**No MongoDB installation required!** Just use Docker:

### Install Docker (if not already installed)

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and log back in for group changes to take effect
```

### Run MongoDB Container

```bash
# Start MongoDB in a Docker container
docker run -d \
  --name kaleidoscope-mongo \
  -p 27017:27017 \
  -v kaleidoscope-data:/data/db \
  --restart unless-stopped \
  mongo:latest

# Verify it's running
docker ps | grep kaleidoscope-mongo
```

### Manage Docker MongoDB

```bash
# Stop MongoDB
docker stop kaleidoscope-mongo

# Start MongoDB
docker start kaleidoscope-mongo

# View logs
docker logs kaleidoscope-mongo

# Remove container (data persists in volume)
docker rm kaleidoscope-mongo

# Remove container AND data
docker rm kaleidoscope-mongo
docker volume rm kaleidoscope-data
```

## Option 2: Native Installation

### Ubuntu/Debian

```bash
# Import MongoDB GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify installation
mongosh --eval "db.version()"
```

### Fedora/RHEL/CentOS

```bash
# Create repository file
cat <<EOF | sudo tee /etc/yum.repos.d/mongodb-org-7.0.repo
[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/\$releasever/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc
EOF

# Install MongoDB
sudo dnf install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify installation
mongosh --eval "db.version()"
```

### macOS

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0

# Verify installation
mongosh --eval "db.version()"
```

### Windows

1. Download MongoDB installer from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer and select "Complete" installation
3. Install MongoDB as a Windows Service
4. Verify by opening Command Prompt and running:
   ```
   mongosh --eval "db.version()"
   ```

## Option 3: MongoDB Atlas (Cloud - Free Tier)

Use MongoDB's cloud service instead of local installation:

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account and cluster
3. Get your connection string
4. Update `backend/humanoid_api.py`:
   ```python
   MONGO_URI = 'mongodb+srv://username:password@cluster.mongodb.net/'
   ```

## Verification

Test your MongoDB connection:

```bash
# Connect to MongoDB shell
mongosh

# You should see something like:
# > Current Mongosh Log ID: ...
# > Connecting to: mongodb://127.0.0.1:27017
# > Using MongoDB: 7.0.x

# List databases
show dbs

# Exit
exit
```

## Common Commands

```bash
# Check if MongoDB is running
ps aux | grep mongod

# Check MongoDB status (Linux)
sudo systemctl status mongod

# View MongoDB logs (Linux)
sudo journalctl -u mongod -f

# Stop MongoDB
sudo systemctl stop mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check which port MongoDB is using
lsof -i :27017
```

## Troubleshooting

### Port 27017 already in use
```bash
# Find process using port 27017
lsof -ti:27017

# Kill the process (if needed)
kill -9 $(lsof -ti:27017)
```

### Permission denied errors
```bash
# Fix MongoDB data directory permissions
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown -R mongodb:mongodb /var/log/mongodb
sudo systemctl restart mongod
```

### Connection refused
```bash
# Ensure MongoDB is running
sudo systemctl start mongod

# Check if it's listening on the correct port
netstat -tuln | grep 27017
```

## For Kaleidoscope Cypher

Once MongoDB is running, you can start the backend:

```bash
cd backend
python3 humanoid_api.py

# You should see:
# ✓ MongoDB connected successfully
# Starting Flask-SocketIO server...
```

## Quick Recommendation

**For development:** Use Docker (Option 1) - It's the fastest and cleanest way to get MongoDB running without affecting your system.

**For production:** Use MongoDB Atlas (Option 3) or properly configure a native installation with security enabled.
