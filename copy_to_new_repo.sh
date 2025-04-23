#!/bin/bash

# Default target directory
TARGET_DIR="/tmp/trx-available-page-$(date +%s)" 

# Check if target directory exists
if [ -d "$TARGET_DIR" ]; then
  echo "Error: Target directory already exists"
  exit 1
fi

# Create target directory
mkdir -p "$TARGET_DIR"

# Copy all files except .git directory
rsync -a --exclude='.git' --exclude='node_modules' ./ "$TARGET_DIR/"

# Initialize new git repository
cd "$TARGET_DIR"
git init
git remote add origin https://github.com/m88220428/trx-available-page.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main

echo "Project successfully initialized and pushed to GitHub"
