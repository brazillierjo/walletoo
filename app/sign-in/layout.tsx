"use client";
import { Route } from "@/src/enums/frontend-routes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

type SignInProps = {
    children: ReactNode;
};

const SignIn: React.FC<SignInProps> = ({ children }) => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session) return redirect(Route.WALLET);
    }, [session]);

    return children as JSX.Element;
};

export default SignIn;
