# Troubleshooting Vercel OAuth Redirect URI Error

If you're still getting the "redirect_uri is not associated with this application" error after updating GitHub settings, follow these steps:

## Step 1: Verify Your Exact Vercel URL

First, identify which URL you're actually using:

1. Check your Vercel deployment:
   - Go to your Vercel project dashboard
   - Look at the **Production** deployment URL
   - It should look like: `https://your-app-name.vercel.app` or `https://your-custom-domain.com`

2. **Important**: Make sure you're testing on the **production** URL, not a preview deployment URL.

## Step 2: Check the Exact Callback URL Format

The callback URL must match **exactly**. Common mistakes:

❌ **WRONG:**
- `https://your-app.vercel.app/api/auth/callback/github/` (trailing slash)
- `http://your-app.vercel.app/api/auth/callback/github` (http instead of https)
- `https://your-app.vercel.app/api/auth/callback/GitHub` (capital letters)
- Missing `/api/auth/callback/github` path

✅ **CORRECT:**
- `https://your-app.vercel.app/api/auth/callback/github` (no trailing slash, lowercase)

## Step 3: Verify GitHub OAuth App Settings

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on your OAuth App
3. Check these fields:

   **Homepage URL:**
   - Should be: `https://your-app.vercel.app` (no trailing slash)

   **Authorization callback URL:**
   - Should include: `https://your-app.vercel.app/api/auth/callback/github`
   - Can include multiple URLs separated by new lines:
     ```
     http://localhost:3000/api/auth/callback/github
     https://your-app.vercel.app/api/auth/callback/github
     ```

4. **Save** the changes if you made any

## Step 4: Verify Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure these are set for **Production**:
   - `AUTH_SECRET` - must match your local one or be a new secure random string
   - `AUTH_GITHUB_ID` - your GitHub Client ID
   - `AUTH_GITHUB_SECRET` - your GitHub Client Secret
   - `AUTH_TRUST_HOST` - set to `true` (optional but recommended)

3. **Important**: After adding/changing environment variables, you MUST redeploy

## Step 5: Check for Preview Deployments

If you're testing on a preview deployment (e.g., `https://your-app-git-branch.vercel.app`):

- **Option 1**: Add the preview URL to your GitHub OAuth app callback URLs
- **Option 2**: Test on the production URL instead
- **Option 3**: Create a separate GitHub OAuth app for preview deployments

## Step 6: Verify Auth Configuration

The `auth.ts` file should include `trustHost: true`:

```typescript
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  trustHost: true, // Required for Vercel
})
```

## Step 7: Clear Browser Cache and Cookies

1. Clear your browser cache
2. Clear cookies for your Vercel domain
3. Try in an incognito/private window
4. Or try a different browser

## Step 8: Check the Actual Redirect URI Being Used

To see what redirect URI Auth.js is actually sending:

1. Open your browser's Developer Tools (F12)
2. Go to the Network tab
3. Try to sign in
4. Look for the request to `github.com/login/oauth/authorize`
5. Check the `redirect_uri` parameter in the URL
6. Compare it exactly with what's in your GitHub OAuth app settings

## Step 9: Redeploy After Changes

After making ANY changes:
1. Go to Vercel Dashboard
2. Go to Deployments
3. Click the three dots on the latest deployment
4. Click "Redeploy"
5. Wait for deployment to complete
6. Test again

## Common Issues and Solutions

### Issue: "redirect_uri mismatch"
**Solution**: The callback URL in GitHub must match exactly. Check for:
- Trailing slashes
- http vs https
- Case sensitivity (must be lowercase)
- Exact path: `/api/auth/callback/github`

### Issue: Works locally but not on Vercel
**Solution**: 
- Verify environment variables are set in Vercel (not just locally)
- Make sure `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` are the same values
- Check that you're using the production URL, not localhost

### Issue: Works on one Vercel deployment but not another
**Solution**: You might be using different GitHub OAuth apps or environment variables. Make sure:
- Preview deployments use the same or separate OAuth app
- Environment variables are set for the correct environment (Production/Preview/Development)

## Still Not Working?

If you've tried all the above:

1. **Check Vercel deployment logs**:
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Check the "Functions" or "Logs" tab for errors

2. **Verify the exact error message**:
   - Take a screenshot of the exact error
   - Note the exact URL you're visiting
   - Check what redirect_uri is shown in the error

3. **Test with a fresh OAuth app**:
   - Create a new GitHub OAuth app
   - Use only your Vercel production URL
   - Update environment variables in Vercel
   - Redeploy

4. **Contact support with details**:
   - Your Vercel deployment URL
   - Your GitHub OAuth app Client ID (not secret!)
   - The exact error message
   - Steps you've already tried

