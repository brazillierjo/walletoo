"use client";
import { UserApi } from "@/src/APIs/userApi";
import { userAtom } from "@/src/atoms/user.atom";
import SpinnerLoadingScreen from "@/src/components/Commons/LoadingScreen";
import { Button } from "@/src/components/ui/button";
import { toast } from "@/src/components/ui/use-toast";
import { Route } from "@/src/enums/frontend-routes";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

type AuthLayoutProps = {
    children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const [user, setUser] = useAtom(userAtom);
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) return redirect(Route.SIGNIN);

        if (!user && session)
            UserApi.get().then((data) => {
                if (data.status === 200) setUser(data.user);
                else {
                    toast({
                        variant: "destructive",
                        title: "Oh oh! Une erreur s'est produite.",
                        description: "Il y a eu un problème dans la récupération de vos données.",
                        action: <Button onClick={() => window.location.reload()}>Recharger</Button>,
                    });
                }
            });
    }, [session, setUser, user]);

    if (!user)
        return (
            <div className='h-[90vh]'>
                <SpinnerLoadingScreen />
            </div>
        );

    return <div className='flex p-4 lg:p-8'>{children}</div>;
};

export default AuthLayout;
