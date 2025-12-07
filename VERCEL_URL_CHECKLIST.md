# Vercel Deployment Checklist for auth-with-github-app.vercel.app

## Your Production URL
**Production URL:** `https://auth-with-github-app.vercel.app`

## Step-by-Step Fix

### 1. Update GitHub OAuth App Settings

Go to [GitHub Developer Settings](https://github.com/settings/developers) → Your OAuth App:

**Homepage URL:**
```
https://auth-with-github-app.vercel.app
```
(No trailing slash)

**Authorization callback URL:**
Add this exact URL (you can have multiple, one per line):
```
http://localhost:3000/api/auth/callback/github
https://auth-with-github-app.vercel.app/api/auth/callback/github
```

**Important:**
- No trailing slash after `.app`
- Must be `https://` (not `http://`)
- Exact path: `/api/auth/callback/github`
- All lowercase

Click **"Update application"** to save.

### 2. Verify Vercel Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Ensure these are set for **Production**:
- `AUTH_SECRET` - Your secret (generate with `openssl rand -base64 32` if needed)
- `AUTH_GITHUB_ID` - Your GitHub Client ID
- `AUTH_GITHUB_SECRET` - Your GitHub Client Secret
- `AUTH_TRUST_HOST` - Set to `true` (optional but recommended)

### 3. Verify Code Configuration

The `src/auth.ts` file should have `trustHost: true`:

```typescript
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  trustHost: true, // Required for Vercel
})
```

### 4. Commit and Push Changes

If you've updated `auth.ts`, commit and push:

```bash
git add src/auth.ts
git commit -m "Add trustHost for Vercel deployment"
git push
```

### 5. Redeploy on Vercel

After updating GitHub settings:
1. Go to Vercel Dashboard → Deployments
2. Click the three dots on the latest deployment
3. Click "Redeploy"
4. Wait for deployment to complete

Or trigger a new deployment by pushing to your main branch.

### 6. Test

1. Go to: https://auth-with-github-app.vercel.app
2. Click "Sign in with GitHub"
3. Should redirect to GitHub for authorization
4. After authorizing, should redirect back to your app

## Common Issues

### Error: "redirect_uri is not associated with this application"

**Check:**
- Callback URL in GitHub exactly matches: `https://auth-with-github-app.vercel.app/api/auth/callback/github`
- No trailing slash
- All lowercase
- Using `https://` not `http://`
- You've saved the changes in GitHub
- You've redeployed on Vercel after making changes

### Still not working?

1. **Check browser console:**
   - Open Developer Tools (F12)
   - Go to Network tab
   - Try signing in
   - Look at the request to `github.com/login/oauth/authorize`
   - Check what `redirect_uri` parameter is being sent

2. **Verify environment variables:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Make sure all three are set: `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`
   - Check they're set for "Production" environment

3. **Clear cache:**
   - Clear browser cache and cookies
   - Try in incognito/private window

## Exact URLs to Use

- **Homepage URL in GitHub:** `https://auth-with-github-app.vercel.app`
- **Callback URL in GitHub:** `https://auth-with-github-app.vercel.app/api/auth/callback/github`
- **Test URL:** https://auth-with-github-app.vercel.app

