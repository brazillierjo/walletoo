"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default function RightSide() {
    const { data: session } = useSession();

    if (session?.user?.name) redirect("/");

    return (
        <div className='relative mt-8 flex flex-col gap-12 overflow-hidden bg-white dark:bg-black px-4 pb-12 md:mt-0 md:w-1/2 md:justify-center lg:w-1/3 lg:px-12'>
            <Button onClick={() => signIn("github")}>Se connecter avec Github</Button>
        </div>
    );
}
