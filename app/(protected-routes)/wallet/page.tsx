"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Route } from "@/core/enums/route";

export default function Wallet() {
    const { data: session } = useSession();
    if (!session) redirect(Route.SIGNIN);

    useEffect(() => {
        async function fetchIncomes() {
            const response = await fetch("/api/incomes");
            const data = await response.json();
            console.log(data);
        }

        fetchIncomes();
    }, [session]);

    return (
        <div>
            <h1>Wallet</h1>
        </div>
    );
}
