import { Card } from "@/src/components/ui/card";
import { TransactionForm } from "./TransactionForm";
import { ITransaction } from "@/src/interfaces/transactionInterface";

type CardTableProps = {
    title: string;
    transactions: ITransaction[];
};

export const CardTable: React.FC<CardTableProps> = ({ title, transactions }) => {
    return (
        <Card className='w-full p-4 md:w-1/2'>
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
                            <tr key={transaction._id}>
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
