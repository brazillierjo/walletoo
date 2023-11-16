"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Route } from "@/src/enums/frontend-routes";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const { data: session } = useSession();

        useEffect(() => {
            if (!session) return redirect(Route.SIGNIN);
        }, [session]);

        return <Component {...props} />;
    };
}
