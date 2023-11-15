"use client";
import { useEffect } from "react";
import { IncomesApi } from "@/core/APIs/incomes";
import isAuth from "@/ui/components/isAuth";

const Wallet: React.FC = () => {
    useEffect(() => {
        IncomesApi.get();
    }, []);

    return (
        <div>
            <h1>Wallet</h1>
        </div>
    );
};

export default isAuth(Wallet);
