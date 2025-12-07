import { auth } from "@/auth"
import { redirect } from "next/navigation"
import UserProfile from "@/components/UserProfile"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Protected Dashboard
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This is a protected route. Only authenticated users can access this
            page.
          </p>
        </div>
        <UserProfile
          name={session.user?.name || undefined}
          email={session.user?.email || undefined}
          image={session.user?.image || undefined}
        />
        <pre className="w-full max-w-2xl overflow-auto rounded-lg bg-zinc-100 p-4 text-sm dark:bg-zinc-900">
          {JSON.stringify(session, null, 2)}
        </pre>
      </main>
    </div>
  )
}

