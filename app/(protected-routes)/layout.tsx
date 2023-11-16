"use client";
import React, { ReactNode } from "react";
import isAuth from "@/src/Providers/isAuth";
import Sidebar from "@/src/components/Sidebar/Sidebar";

type AuthLayoutProps = {
    children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className='flex'>
            <Sidebar />
            {children}
        </div>
    );
};

export default isAuth(AuthLayout);
