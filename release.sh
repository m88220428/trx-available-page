#!/bin/bash

# Verify clean working directory
if [[ -n $(git status -s) ]]; then
  echo "Error: Working directory not clean"
  exit 1
fi

# Bump version
CURRENT_VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "0.0.0")  
NEW_VERSION=$(echo $CURRENT_VERSION | awk -F. '{print $1"."$2"."$3+1}')

# Update version in package.json if exists
if [ -f "package.json" ]; then
  sed -i "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" package.json
fi

# Commit changes
git add .
git commit -m "Release $NEW_VERSION [skip ci]"
git tag v$NEW_VERSION
git push origin main --tags

echo "Successfully released version $NEW_VERSION"
