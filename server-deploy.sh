#!/bin/bash

# Install required tools
echo "Installing required tools..."
sudo apt update
sudo apt install -y nodejs npm nginx
npm install -g pm2

# Create directory for the app
APP_DIR="/var/www/career-evaluator"
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# Copy files to server directory
echo "Copying files..."
cp -r backend frontend $APP_DIR/

# Setup backend
echo "Setting up backend..."
cd $APP_DIR/backend
npm install
pm2 stop career-api || true
pm2 delete career-api || true
pm2 start index.js --name career-api

# Build frontend
echo "Building frontend..."
cd $APP_DIR/frontend
npm install
npm run build

# Setup Nginx configuration
echo "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/career-evaluator << EOF
server {
    listen 80;
    server_name 157.180.120.247;  # Your server IP

    # Frontend
    location / {
        root $APP_DIR/frontend/build;
        try_files \$uri \$uri/ /index.html;
        add_header Access-Control-Allow-Origin *;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        add_header Access-Control-Allow-Origin *;
    }
}
EOF

# Enable the site and restart Nginx
sudo ln -sf /etc/nginx/sites-available/career-evaluator /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t && sudo systemctl restart nginx

# Generate QR code
echo "Generating QR code..."
cd $APP_DIR

# Create QR code generator script
cat > generate-qr.js << EOF
import QRCode from 'qrcode';

const url = 'http://157.180.120.247';  // Your server IP
const outputFile = 'career-evaluator-qr.png';

QRCode.toFile(outputFile, url, {
  color: {
    dark: '#000',
    light: '#FFF'
  },
  width: 1000,
  margin: 1,
  errorCorrectionLevel: 'H'
}, function(err) {
  if (err) throw err;
  console.log('QR Code generated!');
  console.log('Your app is available at:', url);
});
EOF

npm install qrcode
node generate-qr.js

echo "Deployment completed!"
echo "Your app should be accessible at: http://157.180.120.247"
echo "QR code has been generated as: $APP_DIR/career-evaluator-qr.png" 