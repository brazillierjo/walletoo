"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Wallet() {
    const { data: session } = useSession();
    if (!session) redirect("/auth/signin");

    useEffect(() => {
        async function fetchIncomes() {
            try {
                const response = await fetch("/api/incomes");
                const data = await response.json();
                console.log(data);
            } catch (err: any) {}
        }

        fetchIncomes();
    }, [session]);

    return (
        <div>
            <h1>Wallet</h1>
        </div>
    );
}
