# Netlify Deployment Guide

This guide will help you deploy your MERN stack sports ticket booking application to Netlify.

## Prerequisites

1. A Netlify account (sign up at https://netlify.com)
2. A MongoDB Atlas database (or any cloud MongoDB instance)
3. Git repository with your code

## Project Structure for Netlify

The following files have been created/modified for Netlify deployment:

### New Files:
- `netlify.toml` - Netlify configuration file
- `netlify/functions/events.js` - Events API serverless function
- `netlify/functions/bookings.js` - Bookings API serverless function
- `netlify/functions/booking-reference.js` - Booking lookup serverless function
- `netlify/functions/package.json` - Dependencies for serverless functions
- `client/public/_redirects` - URL redirects configuration

### Modified Files:
- `package.json` - Added Netlify build scripts

## Deployment Steps

### 1. Prepare Your MongoDB Database

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/sports-tickets`)
4. Whitelist all IP addresses (0.0.0.0/0) for Netlify's dynamic IPs

### 2. Deploy to Netlify

#### Option A: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

#### Option B: Deploy via Netlify Dashboard

1. Go to https://app.netlify.com/
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/build`

### 3. Set Environment Variables

In your Netlify dashboard, go to Site settings > Environment variables and add:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `NODE_ENV`: Set to `production`

### 4. Configure Functions

Netlify will automatically detect and deploy the functions in the `netlify/functions` directory.

## API Endpoints

After deployment, your API will be available at:

- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/{id}` - Get single event (handled by events function)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/reference/{ref}` - Get booking by reference

## Frontend Configuration

Your React app should make API calls to relative URLs:

```javascript
// Correct usage for Netlify
const response = await fetch('/api/events');
const booking = await fetch('/api/bookings/reference/BK123456');
```

## Build Configuration

The `netlify.toml` file configures:

- **Build settings**: Builds from `client` directory
- **Redirects**: Routes API calls to serverless functions
- **Functions**: Configures serverless function directory
- **Dev settings**: Local development configuration

## Local Development

To test locally with Netlify Dev:

1. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd ../netlify/functions && npm install
   ```

2. Start Netlify Dev:
   ```bash
   netlify dev
   ```

This will start your React app and serverless functions locally.

## Troubleshooting

### Common Issues:

1. **Function Timeout**: Netlify functions have a 10-second timeout on the free plan
2. **Cold Starts**: First request to functions may be slower
3. **Environment Variables**: Ensure all required env vars are set in Netlify dashboard
4. **CORS Issues**: Functions include CORS headers, but check browser console for errors

### Build Errors:

1. **Dependencies**: Make sure all dependencies are in the correct package.json files
2. **Node Version**: Netlify uses Node 18 by default (configured in netlify.toml)
3. **Build Command**: Verify build command in netlify.toml matches your setup

### Function Errors:

1. **Check Function Logs**: Go to Netlify dashboard > Functions > View logs
2. **Test Functions**: Use Netlify's function testing interface
3. **Local Testing**: Use `netlify dev` to test functions locally

## Performance Optimization

1. **Database Connection**: Functions reuse MongoDB connections when possible
2. **Function Size**: Keep functions small and focused
3. **Caching**: Consider implementing caching for frequently accessed data

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **Input Validation**: Validate all inputs in serverless functions
3. **Rate Limiting**: Consider implementing rate limiting for production
4. **CORS**: Configure CORS appropriately for your domain

## Monitoring

1. **Function Analytics**: Monitor function performance in Netlify dashboard
2. **Error Tracking**: Set up error monitoring for production
3. **Database Monitoring**: Monitor MongoDB Atlas performance and usage

## Custom Domain (Optional)

1. In Netlify dashboard, go to Domain settings
2. Add your custom domain
3. Configure DNS settings as instructed
4. SSL certificate will be automatically provisioned

## Continuous Deployment

Netlify automatically deploys when you push to your connected Git branch:

1. Push changes to your repository
2. Netlify automatically builds and deploys
3. Check deployment status in Netlify dashboard

Your MERN stack application is now ready for Netlify deployment!