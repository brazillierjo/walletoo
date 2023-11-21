"use client";
import React, { ReactNode, useEffect } from "react";
import isAuth from "@/src/Providers/isAuth";
import SpinnerLoadingScreen from "@/src/components/Commons/LoadingScreen";
import { userDataAtom } from "@/src/atoms/userData.atoms";
import { useAtom } from "jotai";
import { UserApi } from "@/src/APIs/user";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Route } from "@/src/enums/frontend-routes";

type AuthLayoutProps = {
    children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const [userData, setUserData] = useAtom(userDataAtom);

    const { data: session } = useSession();

    useEffect(() => {
        if (!userData && session) {
            UserApi.get().then((data) => setUserData(data[0]));
        } else if (!session) {
            return redirect(Route.SIGNIN);
        }
    }, [userData, setUserData, session]);

    if (!userData)
        return (
            <div className='flex h-[90vh] p-4 lg:p-8'>
                <SpinnerLoadingScreen />
            </div>
        );

    return <div className='flex p-4 lg:p-8'>{children}</div>;
};

export default isAuth(AuthLayout);
