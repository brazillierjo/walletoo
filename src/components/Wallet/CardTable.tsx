import { ITransaction } from "@/src/interfaces/transaction";
import { Card } from "@/src/components/ui/card";

type CardTableProps = {
    title: string;
    transactions: ITransaction[];
};

export const CardTable: React.FC<CardTableProps> = ({ title, transactions }) => {
    return (
        <Card className='w-1/2 bg-white p-4 dark:bg-slate-600'>
            <h2 className='mb-4 text-lg font-semibold'>{title}</h2>

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
        </Card>
    );
};
