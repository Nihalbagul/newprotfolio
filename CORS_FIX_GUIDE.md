# CORS Error Fix Guide

## Why You're Getting CORS Errors

CORS (Cross-Origin Resource Sharing) errors occur when your frontend (running on one domain) tries to make requests to your backend API (running on a different domain), and the backend hasn't configured the proper headers to allow those requests.

**Your Situation:**
- Frontend: `http://localhost:3000` (development) or your production domain
- Backend: `https://cielbackendmasterdevelopmentfinal.vercel.app`
- Issue: Backend is not sending CORS headers that allow your frontend origin

## Solutions

### ✅ Solution 1: Fix on Backend (Recommended for Production)

You need to add CORS headers to your backend API. Here's how to do it for different backend frameworks:

#### For Express.js/Node.js:
```javascript
const cors = require('cors');

// Allow all origins (not recommended for production)
app.use(cors());

// OR allow specific origins (recommended)
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.vercel.app',
    // Add your production frontend URL here
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

#### For Next.js API Routes:
```javascript
// In your API route file (e.g., /api/user/fcm-token.js)
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or specific origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Your API logic here
  // ...
}
```

#### For Vercel Serverless Functions:
Create a `vercel.json` file in your backend project:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
      ]
    }
  ]
}
```

### ✅ Solution 2: Use Vite Proxy (Development Only)

I've already configured a Vite proxy in `vite.config.js` for development. This means:

- **In Development**: Use `/api/user/fcm-token` instead of the full URL
- **In Production**: You still need to fix CORS on the backend

**Example Usage:**
```javascript
import { updateFCMToken } from './utils/api';

// In development, this will be proxied through Vite
// In production, this will call the full URL
await updateFCMToken('your-token-here');
```

## Testing the Fix

1. **Check CORS Headers**: Open browser DevTools → Network tab → Check response headers for:
   - `Access-Control-Allow-Origin`
   - `Access-Control-Allow-Methods`
   - `Access-Control-Allow-Headers`

2. **Test the API**: Use the utility functions in `src/utils/api.js`:
   ```javascript
   import { updateFCMToken } from './utils/api';
   
   try {
     const result = await updateFCMToken('your-fcm-token');
     console.log('Success:', result);
   } catch (error) {
     console.error('Error:', error);
   }
   ```

## Important Notes

- ⚠️ **Never use `Access-Control-Allow-Origin: *` in production** if you're sending credentials
- ✅ **Always specify allowed origins** in production
- ✅ **The Vite proxy only works in development** - production still needs backend CORS fix
- ✅ **Test in both development and production** environments

## Need Help?

If you're still getting CORS errors after implementing these fixes:
1. Check browser console for the exact error message
2. Verify the backend is actually sending CORS headers
3. Make sure you're not blocking OPTIONS requests (preflight)
4. Check if credentials are needed and if so, configure them properly

