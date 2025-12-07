"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import UserProfile from "./UserProfile"

export default function AuthSection() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    )
  }

  if (session?.user) {
    return (
      <div className="flex flex-col items-center gap-6">
        <UserProfile
          name={session.user.name || undefined}
          email={session.user.email || undefined}
          image={session.user.image || undefined}
        />
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[200px]"
          >
            View Dashboard
          </Link>
          <LogoutButton />
        </div>
      </div>
    )
  }

  return <LoginButton />
}

