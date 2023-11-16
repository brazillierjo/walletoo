"use client";
import { useSession } from "next-auth/react";

const Sidebar: React.FC = () => {
    const { data: session } = useSession();

    return (
        <div className='flex min-h-screen w-2/12 justify-center bg-white px-4 py-8 dark:bg-black'>
            <h2>{session?.user?.name ?? "..."}</h2>
        </div>
    );
};

export default Sidebar;
