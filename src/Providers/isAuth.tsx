"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Route } from "@/src/enums/frontend-routes";
import { useAtom } from "jotai";
import { userDataAtom } from "@/src/atoms/userData.atoms";
import { UserApi } from "@/src/APIs/userApi";
import SpinnerLoadingScreen from "@/src/components/Commons/LoadingScreen";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const [userData, setUserData] = useAtom(userDataAtom);
        const { data: session } = useSession();

        useEffect(() => {
            if (!session) return redirect(Route.SIGNIN);

            if (!userData && session) UserApi.get().then((data) => setUserData(data[0]));
        }, [session, setUserData, userData]);

        if (!userData)
            return (
                <div className='h-[90vh]'>
                    <SpinnerLoadingScreen />
                </div>
            );

        return <Component {...props} />;
    };
}
