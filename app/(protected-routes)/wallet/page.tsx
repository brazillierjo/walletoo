"use client";
import { userDataAtom } from "@/src/atoms/userData.atoms";
import { CardTable } from "@/src/components/Wallet/CardTable";
import { ITransaction } from "@/src/mongoDB/userSchema";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const Wallet: React.FC = () => {
    const [userData] = useAtom(userDataAtom);

    const [incomes, setIncomes] = useState<ITransaction[] | null>(null);
    const [expenses, setExpenses] = useState<ITransaction[] | null>(null);

    useEffect(() => {
        if (userData) {
            setIncomes(userData.incomes);
            setExpenses(userData.expenses);
        }
    }, [userData]);

    return (
        <div className='flex w-full flex-col gap-6'>
            <h1 className='shrink text-xl font-bold'>Mon Wallet personnel</h1>

            <div className='flex flex-col justify-evenly gap-3 md:flex-row'>
                {incomes && <CardTable title='Revenus' transactions={incomes} />}
                {expenses && <CardTable title='Dépenses' transactions={expenses} />}
            </div>
        </div>
    );
};

export default Wallet;
