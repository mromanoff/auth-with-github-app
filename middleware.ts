import { auth } from "@/auth"

export default auth((req) => {
  // Only protect the /dashboard route
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!req.auth) {
      const loginUrl = new URL("/", req.nextUrl.origin)
      return Response.redirect(loginUrl)
    }
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

