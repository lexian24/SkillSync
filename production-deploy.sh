#!/bin/bash

echo "🚀 Starting Production Deployment to 157.180.120.247..."

# Configuration
SERVER_IP="157.180.120.247"
APP_DIR="/var/www/career-evaluator"
DOMAIN="157.180.120.247"

# Check if we're running as root
if [[ $EUID -ne 0 ]]; then
   echo "❌ This script must be run as root (use sudo)"
   exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 18.x
echo "🟢 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 and other tools
echo "🔧 Installing PM2 and tools..."
npm install -g pm2
apt install -y nginx git

# Create app directory
echo "📁 Creating application directory..."
mkdir -p $APP_DIR
chown -R www-data:www-data $APP_DIR

# Copy application files
echo "📋 Copying application files..."
cp -r backend frontend $APP_DIR/

# Set proper permissions
chown -R www-data:www-data $APP_DIR
chmod -R 755 $APP_DIR

# Setup environment file
echo "🔐 Setting up environment variables..."
cat > $APP_DIR/backend/.env << EOF
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=production
PORT=5002
EOF

echo "⚠️  IMPORTANT: Edit $APP_DIR/backend/.env and add your OpenAI API key!"

# Install backend dependencies
echo "🔨 Installing backend dependencies..."
cd $APP_DIR/backend
npm install

# Stop existing processes
echo "🛑 Stopping existing processes..."
pm2 stop career-api || true
pm2 delete career-api || true

# Start backend
echo "🚀 Starting backend..."
pm2 start index.js --name career-api
pm2 startup
pm2 save

# Install frontend dependencies and build
echo "🔨 Building frontend..."
cd $APP_DIR/frontend
npm install
npm run build

# Configure Nginx
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/career-evaluator << EOF
server {
    listen 80;
    server_name $DOMAIN;

    # Frontend
    location / {
        root $APP_DIR/frontend/build;
        try_files \$uri \$uri/ /index.html;
        add_header Access-Control-Allow-Origin *;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5002/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        add_header Access-Control-Allow-Origin *;
    }
}
EOF

# Enable site
echo "✅ Enabling site..."
ln -sf /etc/nginx/sites-available/career-evaluator /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t
if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration valid"
    systemctl restart nginx
else
    echo "❌ Nginx configuration invalid"
    exit 1
fi

# Configure firewall
echo "🔥 Configuring firewall..."
ufw allow 80/tcp
ufw allow 5002/tcp
ufw --force enable

# Generate QR code
echo "📱 Generating QR code..."
cd $APP_DIR
npm install qrcode
node ../generate-production-qr.js

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📱 Your app is available at: http://$SERVER_IP"
echo "🔧 Backend API: http://$SERVER_IP:5002"
echo "📊 PM2 Status: pm2 status"
echo "📋 PM2 Logs: pm2 logs career-api"
echo ""
echo "⚠️  REMEMBER TO:"
echo "   1. Edit $APP_DIR/backend/.env with your OpenAI API key"
echo "   2. Restart backend: pm2 restart career-api"
echo ""
echo "🔍 Test your deployment:"
echo "   Backend: curl http://$SERVER_IP:5002/"
echo "   Frontend: curl http://$SERVER_IP/" 