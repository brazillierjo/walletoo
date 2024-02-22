"use client";

import { ReactNode, useEffect } from "react";
import { redirect } from "next/navigation";
import { Route } from "@/src/enums/frontendRoutes";
import { useSession } from "next-auth/react";

type SignInProps = {
  children: ReactNode;
};

const SignIn: React.FC<SignInProps> = ({ children }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) return redirect(Route.WIDGETS);
  }, [session]);

  return children as JSX.Element;
};

export default SignIn;
