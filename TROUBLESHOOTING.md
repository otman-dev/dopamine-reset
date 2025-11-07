# Vercel 404 Troubleshooting

## Step 1: Add Environment Variable in Vercel

1. Go to your Vercel project: https://vercel.com/otman-dev/dopamine-reset
2. Click **Settings** tab
3. Click **Environment Variables** in the left sidebar
4. Add new variable:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://mouhib_db_user:Hhk7qIiF5lUjNf2b@farm-cluster-01.mxvp7p0.mongodb.net/dopamine-reset?retryWrites=true&w=majority`
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

## Step 2: Redeploy

After adding the environment variable:
1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## Step 3: Test the Deployment

Visit your deployed URL and:
1. Check if the page loads (should show the "Start 14-Day Reset" button)
2. Click "Start" button
3. You should get a unique tracking link

## Step 4: Check Health Endpoint

Visit: `https://your-app.vercel.app/api/health`

Should return:
```json
{
  "status": "ok",
  "mongodb": "configured",
  "timestamp": "2025-11-07T..."
}
```

If it shows `"mongodb": "missing"`, the environment variable isn't set correctly.

## Common Issues:

### Issue: Page shows 404
- **Cause**: Build failed or route not found
- **Fix**: Check deployment logs in Vercel

### Issue: Start button doesn't work
- **Cause**: MongoDB not configured
- **Fix**: Add MONGODB_URI environment variable

### Issue: "User not found" after redeploying
- **Cause**: Database was cleared or userId doesn't exist
- **Fix**: Normal - start a new session

## Quick Test Locally

```bash
# Make sure .env.local exists with MONGODB_URI
npm run dev

# Visit http://localhost:3000
# Click Start - should work without errors
```

## Need Help?

Check Vercel deployment logs:
1. Go to your project in Vercel
2. Click on the failed deployment
3. View **Build Logs** and **Function Logs**
4. Look for error messages
