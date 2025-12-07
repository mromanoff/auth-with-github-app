This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and configured with GitHub OAuth authentication using [Auth.js](https://authjs.dev/) (NextAuth.js v5).

## Features

- ✅ GitHub OAuth authentication
- ✅ JWT-based session management (stateless, no database required)
- ✅ Protected routes with middleware
- ✅ TypeScript support
- ✅ Tailwind CSS v4 styling
- ✅ Next.js 16 App Router

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up GitHub OAuth Application

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: Your app name
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Generate a random secret: openssl rand -base64 32
AUTH_SECRET=your-generated-secret-here

# GitHub OAuth Credentials from step 2
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

### 5. Test Authentication

1. Click "Sign in with GitHub" on the home page
2. Authorize the application with GitHub
3. You'll be redirected back and see your profile
4. Visit `/dashboard` to see a protected route example

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/  # Auth.js API routes
│   ├── dashboard/               # Example protected route
│   ├── layout.tsx               # Root layout with SessionProvider
│   └── page.tsx                 # Home page with authentication
├── components/
│   ├── AuthSection.tsx          # Authentication UI wrapper
│   ├── LoginButton.tsx          # GitHub login button
│   ├── LogoutButton.tsx         # Logout button
│   ├── SessionProvider.tsx      # NextAuth SessionProvider wrapper
│   └── UserProfile.tsx          # User profile display
└── auth.ts                      # Auth.js configuration
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Auth.js Documentation](https://authjs.dev/) - authentication with NextAuth.js v5
- [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS framework

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
