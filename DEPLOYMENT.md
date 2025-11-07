# Vercel Deployment Guide

## Quick Deploy Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Dopamine Reset Tracker"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Add Environment Variable:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://mouhib_db_user:Hhk7qIiF5lUjNf2b@farm-cluster-01.mxvp7p0.mongodb.net/dopamine-reset?retryWrites=true&w=majority`
5. Click "Deploy"

### 3. How It Works

✅ **Start Program**: 
- User clicks "Start 14-Day Reset"
- Creates unique ID in MongoDB
- Generates shareable link

✅ **Cross-Device Sync**: 
- User copies the unique link
- Can access progress from phone, tablet, computer
- All devices show same progress in real-time

✅ **Auto-Tracking**: 
- Progress calculates from start timestamp
- Updates automatically every minute
- No manual input needed

### 4. MongoDB Database Structure

```javascript
Collection: users
{
  userId: "abc123xyz",        // 10-character unique ID
  startDate: ISODate("..."),  // Timestamp when user started
  createdAt: ISODate("...")   // Record creation time
}
```

### 5. Testing Locally

Make sure `.env.local` exists with:
```
MONGODB_URI=mongodb+srv://mouhib_db_user:Hhk7qIiF5lUjNf2b@farm-cluster-01.mxvp7p0.mongodb.net/dopamine-reset?retryWrites=true&w=majority
```

Then run:
```bash
npm run dev
```

Open http://localhost:3000

### 6. Features

- ✅ Click "Start" → Get unique tracking link
- ✅ Copy link to access from any device
- ✅ Progress automatically syncs
- ✅ Works offline, syncs when back online
- ✅ No login required, just the link

---

**Security Note**: The link contains your unique ID. Don't share it publicly if you want to keep your progress private.
