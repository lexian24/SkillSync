#!/bin/bash

# Install PM2 if not installed
npm install -g pm2

# Deploy Backend
cd backend
npm install
pm2 stop career-evaluator-api || true
pm2 delete career-evaluator-api || true
pm2 start index.js --name career-evaluator-api

# Deploy Frontend
cd ../frontend
npm install
npm run build

# Assuming you have nginx installed
# Create nginx configuration
sudo tee /etc/nginx/sites-available/career-evaluator << EOF
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    # Frontend
    location / {
        root /path/to/your/frontend/build;  # Replace with actual path
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/career-evaluator /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

echo "Deployment completed!" 