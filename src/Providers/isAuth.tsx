"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Route } from "@/src/enums/frontend-routes";
import { useAtom } from "jotai";
import { userAtom } from "@/src/atoms/user.atom";
import { UserApi } from "@/src/APIs/userApi";
import SpinnerLoadingScreen from "@/src/components/Commons/LoadingScreen";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const [user, setUser] = useAtom(userAtom);
        const { data: session } = useSession();

        useEffect(() => {
            if (!session) return redirect(Route.SIGNIN);

            if (!user && session) UserApi.get().then((data) => setUser(data[0]));
        }, [session, setUser, user]);

        if (!user)
            return (
                <div className='h-[90vh]'>
                    <SpinnerLoadingScreen />
                </div>
            );

        return <Component {...props} />;
    };
}
