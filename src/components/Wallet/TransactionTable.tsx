import { Card } from "@/src/components/ui/card";
import { TransactionForm } from "./TransactionForm";
import { TransactionType } from "@/src/enums/transactionType";
import { useAtom } from "jotai";
import { userAtom } from "@/src/atoms/user.atom";

type TransactionTableProps = {
    type: TransactionType;
};

export const TransactionTable: React.FC<TransactionTableProps> = ({ type }) => {
    const [user, setUser] = useAtom(userAtom);
    const transactions = type === TransactionType.INCOMES ? user?.incomes : user?.expenses;

    if (!transactions || !user) return null;

    return (
        <Card className='w-full p-4 md:w-1/2'>
            <h2 className='mb-4 text-lg font-semibold'>{type}</h2>

            <div className='mb-4'>
                {transactions.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th className='text-sm uppercase'>Label</th>
                                <th className='text-sm uppercase'>Montant</th>
                                <th className='text-sm uppercase'>Catégorie</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.label}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className='mb-8 text-center text-xs italic'>Aucune transaction enregistrée.</p>
                )}
            </div>

            <TransactionForm type={type} user={user} setUser={setUser} />
        </Card>
    );
};
