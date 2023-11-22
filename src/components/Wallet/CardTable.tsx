import { Card } from "@/src/components/ui/card";
import { ITransaction } from "@/src/mongoDB/userSchema";
import { Input } from "@/src/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import { TransactionForm } from "./TransactionForm";

type CardTableProps = {
    title: string;
    transactions: ITransaction[];
};

export const CardTable: React.FC<CardTableProps> = ({ title, transactions }) => {
    return (
        <Card className='w-full bg-white p-4 dark:bg-slate-600 md:w-1/2'>
            <h2 className='mb-4 text-lg font-semibold'>{title}</h2>

            {transactions?.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th className='text-sm uppercase'>Label</th>
                            <th className='text-sm uppercase'>Montant</th>
                            <th className='text-sm uppercase'>Catégorie</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.label}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <>
                    <p className='mb-8 text-center text-sm italic'>
                        Aucune transaction enregistrée.
                    </p>

                    <TransactionForm />
                </>
            )}
        </Card>
    );
};
