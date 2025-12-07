import AuthSection from "@/components/AuthSection";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 px-16 py-32">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            GitHub OAuth Authentication
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Sign in with your GitHub account to get started. This app uses
            NextAuth.js v5 with JWT-based sessions for secure authentication.
          </p>
        </div>
        <AuthSection />
      </main>
    </div>
  );
}
