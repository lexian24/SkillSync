#!/bin/bash

echo "Starting Career Evaluator Demo..."

# Kill any existing Node.js processes
echo "Cleaning up any existing processes..."
pkill -f node || true

# Generate QR code
echo "Generating QR code..."
node generate-demo-qr.js

# Start backend server
echo "Starting backend server..."
cd backend
npm start &

# Start frontend server
echo "Starting frontend server..."
cd ../frontend
npm start &

echo "Demo is ready! Open demo-qr.png to show the QR code to judges."
echo "Press Ctrl+C to stop all servers when done."

# Wait for Ctrl+C
trap "pkill -f node; exit 0" INT
while true; do sleep 1; done 