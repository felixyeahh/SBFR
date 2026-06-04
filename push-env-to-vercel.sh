#!/bin/bash
# Pushes all NEXT_PUBLIC_FIREBASE_* vars from .env.local to Vercel (all environments)
set -e

ENV_FILE=".env.local"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ $ENV_FILE not found"
  exit 1
fi

echo "📦 Pushing Firebase env vars to Vercel..."

while IFS='=' read -r key value; do
  # Skip comments and empty lines
  [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue

  # Trim whitespace
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)

  # Only push NEXT_PUBLIC_FIREBASE_ vars
  if [[ "$key" == NEXT_PUBLIC_FIREBASE_* ]]; then
    echo "  → Adding $key"
    # Add to production, preview, and development environments
    echo "$value" | vercel env add "$key" production --force 2>/dev/null || true
    echo "$value" | vercel env add "$key" preview --force 2>/dev/null || true
    echo "$value" | vercel env add "$key" development --force 2>/dev/null || true
  fi
done < "$ENV_FILE"

echo ""
echo "✅ Done! Redeploy with: npm run production"
