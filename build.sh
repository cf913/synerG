#!/bin/bash
GREEN='\033[0;32m'
echo "  Installing project..."
echo "  "
npm install
npm --prefix ./client install
npm  --prefix ./client run build
echo -e "  ${GREEN}Installation complete."
echo "  "
echo "  ==> npm start or nodemon to run"