# GitHub OAuth Setup Guide

This guide will help you set up GitHub OAuth authentication for your Next.js application.

## Step 1: Create GitHub OAuth Application

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on **"OAuth Apps"** in the left sidebar
3. Click **"New OAuth App"** button
4. Fill in the application details:

   - **Application name**: `Your App Name` (e.g., "My Next.js App")
   - **Homepage URL**: 
     - For development: `http://localhost:3000`
     - For production: `https://your-domain.com`
   - **Authorization callback URL**: 
     - For development: `http://localhost:3000/api/auth/callback/github`
     - For production: `https://your-domain.com/api/auth/callback/github`

5. Click **"Register application"**
6. You'll be redirected to your new OAuth app page
7. Copy the **Client ID** (you'll see it immediately)
8. Click **"Generate a new client secret"** and copy the **Client Secret**

## Step 2: Configure Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```bash
# Generate a random secret using: openssl rand -base64 32
AUTH_SECRET=kDbv10Is1MIK9vfV4b2hPAPn698M8rvzGeklY5scZ+w=

# GitHub OAuth Credentials from Step 1
AUTH_GITHUB_ID=your-github-client-id-here
AUTH_GITHUB_SECRET=your-github-client-secret-here
```

**Important Notes:**
- Replace `your-github-client-id-here` with your actual Client ID
- Replace `your-github-client-secret-here` with your actual Client Secret
- The `AUTH_SECRET` above is a sample - you can generate your own using:
  ```bash
  openssl rand -base64 32
  ```
- Never commit `.env.local` to version control (it's already in `.gitignore`)

## Step 3: Test the Setup

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Click **"Sign in with GitHub"**

4. You'll be redirected to GitHub to authorize the application

5. After authorizing, you'll be redirected back to your app and see your profile

6. Visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to see a protected route example

## Production Setup

For production deployment:

1. Create a new GitHub OAuth App with production URLs:
   - Homepage URL: `https://your-domain.com`
   - Authorization callback URL: `https://your-domain.com/api/auth/callback/github`

2. Set the environment variables in your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Other platforms: Follow their documentation for setting environment variables

3. Update the GitHub OAuth App callback URL to match your production domain

## Troubleshooting

### "Invalid redirect URI" error
- Make sure the Authorization callback URL in your GitHub OAuth App exactly matches: `http://localhost:3000/api/auth/callback/github`
- Check for typos or trailing slashes

### Authentication not working
- Verify all environment variables are set correctly in `.env.local`
- Restart your development server after adding/changing environment variables
- Check the browser console and terminal for error messages

### Session not persisting
- Ensure `AUTH_SECRET` is set and is a valid base64 string
- Check that cookies are enabled in your browser

## Additional Resources

- [Auth.js Documentation](https://authjs.dev/)
- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

