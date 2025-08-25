# Vercel Deployment Guide

This guide will help you deploy your MERN stack sports ticket booking application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A MongoDB Atlas database (or any cloud MongoDB instance)
3. Git repository with your code

## Deployment Steps

### 1. Prepare Your MongoDB Database

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get your connection string (it should look like: `mongodb+srv://username:password@cluster.mongodb.net/sports-tickets`)
4. Whitelist Vercel's IP addresses or use `0.0.0.0/0` for all IPs

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project root:
   ```bash
   vercel
   ```

#### Option B: Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration

### 3. Set Environment Variables

In your Vercel dashboard, go to your project settings and add these environment variables:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `NODE_ENV`: Set to `production`

### 4. Configure Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click on "Domains" tab
3. Add your custom domain if you have one

## Project Structure Changes Made

The following files were created/modified to make your app Vercel-compatible:

### New Files:
- `vercel.json` - Vercel configuration
- `api/_db.js` - Database connection helper for serverless functions
- `api/events/index.js` - Events API endpoint
- `api/events/[id].js` - Single event API endpoint
- `api/bookings/index.js` - Bookings API endpoint
- `api/bookings/reference/[ref].js` - Booking lookup API endpoint

### Modified Files:
- `client/package.json` - Added homepage field for proper routing
- `package.json` - Added vercel-build script

## API Endpoints

After deployment, your API will be available at:

- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/[id]` - Get single event
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/reference/[ref]` - Get booking by reference

## Frontend Updates Needed

Update your React app's API calls to use relative URLs:

```javascript
// Instead of: http://localhost:5000/api/events
// Use: /api/events

const response = await fetch('/api/events');
```

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**: Make sure your MongoDB URI is correct and your database allows connections from Vercel's IPs.

2. **API Routes Not Working**: Ensure your frontend is making requests to `/api/...` paths.

3. **Build Failures**: Check that all dependencies are listed in package.json files.

4. **Environment Variables**: Double-check that all required environment variables are set in Vercel dashboard.

### Logs and Debugging:

- View function logs in Vercel dashboard under "Functions" tab
- Use `vercel logs` command to see recent logs
- Check the "Deployments" tab for build logs

## Performance Considerations

- Serverless functions have cold start times
- Consider implementing connection pooling for MongoDB
- Use Vercel's Edge Functions for better performance if needed

## Security Notes

- Never commit sensitive environment variables to Git
- Use strong JWT secrets
- Implement proper input validation
- Consider rate limiting for production use