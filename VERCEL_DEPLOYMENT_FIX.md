# Fix Vercel Deployment - GitHub OAuth Redirect URI Error

## Problem

When deploying to Vercel, you're getting this error:
```
Be careful! The redirect_uri is not associated with this application.
```

This happens because your GitHub OAuth app doesn't have your Vercel production URL registered as a valid callback URL.

## Solution

### Step 1: Update GitHub OAuth App Settings

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on **"OAuth Apps"** in the left sidebar
3. Find and click on your OAuth application
4. Update the following fields:

   **Homepage URL:**
   - Change from `http://localhost:3000` to your production URL:
   - `https://your-app.vercel.app` (replace with your actual Vercel URL)
   - Or your custom domain if you have one: `https://your-custom-domain.com`

   **Authorization callback URL:**
   - You can add **multiple callback URLs** - add both:
     - `http://localhost:3000/api/auth/callback/github` (for local development)
     - `https://your-app.vercel.app/api/auth/callback/github` (replace with your actual Vercel URL)
     - If you have a custom domain: `https://your-custom-domain.com/api/auth/callback/github`

   **Note:** GitHub allows multiple callback URLs separated by commas or new lines. You can list them like:
   ```
   http://localhost:3000/api/auth/callback/github
   https://your-app.vercel.app/api/auth/callback/github
   ```

5. Click **"Update application"** to save

### Step 2: Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Make sure these variables are set for **Production** (and Preview if needed):

```
AUTH_SECRET=your-auth-secret-here
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
AUTH_TRUST_HOST=true
```

**Important:**
- Use the same `AUTH_SECRET` value you use locally (or generate a new one)
- `AUTH_TRUST_HOST=true` tells Auth.js to trust the proxy headers from Vercel
- Note: `AUTH_URL` is NOT needed - Auth.js v5 automatically detects the host from request headers on Vercel

### Step 3: Update Auth Configuration

The `auth.ts` file has been updated to include `trustHost: true` which is required for Vercel deployments. This should already be in your code, but verify it:

```typescript
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  trustHost: true, // Required for Vercel
})
```

### Step 4: Redeploy Your Application

After updating the GitHub OAuth app settings:
1. Go to your Vercel dashboard
2. Commit and push the updated `auth.ts` file (if you haven't already)
3. Trigger a new deployment (or wait for the next automatic deployment)
4. Test the authentication flow

## Quick Check

After making these changes, verify:
- ✅ GitHub OAuth app Homepage URL is updated to your Vercel URL
- ✅ GitHub OAuth app has your Vercel callback URL registered
- ✅ All environment variables are set in Vercel (AUTH_SECRET, AUTH_GITHUB_ID, AUTH_GITHUB_SECRET)
- ✅ Application has been redeployed after changes
- ✅ Test the authentication flow on your Vercel deployment

## Troubleshooting

### Still getting the error?
- Double-check the callback URL in GitHub matches exactly (including `https://`, no trailing slash)
- Verify all environment variables are set in Vercel for the correct environment (Production/Preview)
- Make sure you've triggered a new deployment after updating GitHub settings
- Check Vercel deployment logs for any authentication-related errors

### Multiple Environments
If you have multiple Vercel environments (production, preview branches):
- Add each preview URL to your GitHub OAuth app callback URLs
- Or create separate GitHub OAuth apps for different environments
- Set environment-specific variables in Vercel

