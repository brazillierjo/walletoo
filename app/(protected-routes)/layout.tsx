"use client";
import React, { ReactNode } from "react";
import isAuth from "@/src/Providers/isAuth";

type AuthLayoutProps = {
    children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return <div className='flex px-4 lg:px-8'>{children}</div>;
};

export default isAuth(AuthLayout);
