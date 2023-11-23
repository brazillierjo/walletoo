import { Card } from "@/src/components/ui/card";
import { TransactionForm } from "./TransactionForm";
import { TransactionType } from "@/src/enums/transactionType";
import { useAtom } from "jotai";
import { userAtom } from "@/src/atoms/user.atom";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { ITransaction } from "@/src/interfaces/transactionInterface";
import { Switch } from "@/src/components/ui/switch";
import { MdModeEdit } from "react-icons/md";
import { cn } from "@/src/tools/tailwindMerge";

type TransactionTableProps = {
    type: TransactionType;
};

export const TransactionTable: React.FC<TransactionTableProps> = ({ type }) => {
    const [user, setUser] = useAtom(userAtom);
    const [isEditMode, setIsEditMode] = useState(true);

    const transactions = type === TransactionType.INCOMES ? user?.incomes : user?.expenses;

    const handleDelete = (transaction: ITransaction) => {
        console.log(transaction);
    };

    if (!transactions || !user) return null;

    return (
        <Card className='flex w-full flex-col p-4 md:w-1/2'>
            <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>{type}</h2>

                <div className='flex items-center gap-2'>
                    <Switch checked={isEditMode} onClick={() => setIsEditMode(!isEditMode)} />
                    <MdModeEdit className='fill-gray-500 dark:fill-white' />
                </div>
            </div>

            <div className='mb-4 px-2'>
                {transactions.length > 0 ? (
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='px-4 py-1 text-left text-sm uppercase'>Label</th>
                                <th className='px-4 py-1 text-right text-sm uppercase'>Montant</th>
                                {isEditMode && <th className='px-4 py-1 text-right text-sm uppercase'>Actions</th>}
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index} className='border-b border-t'>
                                    <td className='border-r px-4 py-1 text-left'>{transaction.label}</td>
                                    <td className={cn("px-4 py-1 text-right", isEditMode && "border-r")}>{transaction.amount}</td>
                                    {isEditMode && (
                                        <td
                                            onClick={() => handleDelete(transaction)}
                                            className='flex items-center justify-end px-4 pt-2 hover:cursor-pointer'>
                                            <MdDeleteForever className='fill-red-500 transition-all duration-150 hover:opacity-50' />
                                        </td>
                                    )}
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