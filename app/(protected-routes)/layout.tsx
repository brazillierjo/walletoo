"use client";
import React, { ReactNode, useEffect } from "react";
import isAuth from "@/src/Providers/isAuth";
import { userDataAtom } from "@/src/atoms/userData.atoms";
import { useAtom } from "jotai";
import { UserApi } from "@/src/APIs/user";
import { useSession } from "next-auth/react";

type AuthLayoutProps = {
    children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const [userData, setUserData] = useAtom(userDataAtom);

    const { data: session } = useSession();

    useEffect(() => {
        if (!userData && session) {
            UserApi.get().then((data) => setUserData(data[0]));
        }
    }, [userData, setUserData, session]);

    if (!userData) return <div className='flex p-4 lg:p-8'>Chargement...</div>;

    return <div className='flex p-4 lg:p-8'>{children}</div>;
};

export default isAuth(AuthLayout);
