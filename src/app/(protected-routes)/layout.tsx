"use client";

import { ReactNode, useEffect } from "react";
import { redirect } from "next/navigation";
import { UserApi } from "@/src/APIs/userApi";
import { sidebarAtom } from "@/src/atoms/sidebar.atom";
import { userAtom } from "@/src/atoms/user.atom";
import SpinnerLoadingScreen from "@/src/components/Commons/LoadingScreen";
import { Route } from "@/src/enums/frontendRoutes";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(sidebarAtom);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return redirect(Route.SIGNIN);

    if (!user)
      UserApi.get().then((res) => {
        if (res.status === 200 && res.data) setUser(res.data);
        else redirect(Route.SIGNIN);
      });

    !isSidebarOpen && setIsSidebarOpen(true);
  }, [session, setUser, user]);

  if (!user)
    return (
      <div className="h-[90vh]">
        <SpinnerLoadingScreen />
      </div>
    );

  return children as JSX.Element;
};

export default AuthLayout;
