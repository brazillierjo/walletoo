import Image from "next/image";
import { useSession } from "next-auth/react";

export const UserAvatar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-5 p-6">
      {session?.user?.image && (
        <Image src={session.user.image} width={80} height={80} alt="user avatar" className="mx-auto rounded-full" />
      )}

      <h2 className="text-center text-xl font-bold">{session?.user?.name ?? "..."}</h2>
    </div>
  );
};
