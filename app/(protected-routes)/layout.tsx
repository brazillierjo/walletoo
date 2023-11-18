"use client";
import React, { ReactNode, useEffect } from "react";
import isAuth from "@/src/Providers/isAuth";
import { userDataAtom } from "@/src/atoms/userData.atoms";
import { useAtom } from "jotai";
import { UserDataApi } from "@/src/APIs/transactions";

type AuthLayoutProps = {
    children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const [userData, setUserData] = useAtom(userDataAtom);

    useEffect(() => {
        if (!userData) {
            UserDataApi.get().then((data) => setUserData(data));
        }
    }, [userData, setUserData]);

    if (!userData) return <>Chargement...</>;

    return <div className='flex p-4 lg:p-8'>{children}</div>;
};

export default isAuth(AuthLayout);
