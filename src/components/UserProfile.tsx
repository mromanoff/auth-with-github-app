import Image from "next/image"

interface UserProfileProps {
  name?: string | null
  email?: string | null
  image?: string | null
}

export default function UserProfile({ name, email, image }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center gap-4 sm:items-start">
      {image && (
        <Image
          src={image}
          alt={name || "User"}
          width={64}
          height={64}
          className="rounded-full"
        />
      )}
      <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
        {name && (
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
            {name}
          </h2>
        )}
        {email && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{email}</p>
        )}
      </div>
    </div>
  )
}

