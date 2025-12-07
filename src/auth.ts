import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  trustHost: true, // Required for Vercel deployments
})

