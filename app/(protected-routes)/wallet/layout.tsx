"use client";
import React, { ReactNode, useEffect } from "react";
import isAuth from "@/src/Providers/isAuth";
import { useAtom } from "jotai";
import { expensesAtom, incomesAtom } from "@/src/atoms/transactions.atoms";
import { ExpensesApi, IncomesApi } from "@/src/APIs/transactions";

type AuthLayoutProps = {
    children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const [incomes, setIncomes] = useAtom(incomesAtom);
    const [expenses, setExpenses] = useAtom(expensesAtom);

    useEffect(() => {
        if (!incomes) {
            IncomesApi.get().then((data) => setIncomes(data));
        }

        if (!expenses) {
            ExpensesApi.get().then((data) => setExpenses(data));
        }
    }, [expenses, incomes, setExpenses, setIncomes]);

    if (!incomes || !expenses) return <>Chargement...</>;

    return children as JSX.Element;
};

export default isAuth(AuthLayout);
