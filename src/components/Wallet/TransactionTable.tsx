import { Card } from "@/src/components/ui/card";
import { TransactionForm } from "./TransactionForm";
import { TransactionType } from "@/src/enums/transactionType";
import { useAtom } from "jotai";
import { userAtom } from "@/src/atoms/user.atom";
import { useMemo, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { ITransaction } from "@/src/interfaces/transactionInterface";
import { Switch } from "@/src/components/ui/switch";
import { MdModeEdit } from "react-icons/md";
import { cn } from "@/src/utils/tailwindMerge";
import { DynamicUrlParams } from "@/src/enums/dynamicUrlParams";
import { TransactionApi } from "@/src/APIs/transactionApi";
import { TransactionFilter } from "@/src/enums/transactionFilter";
import { IoChevronDownOutline } from "react-icons/io5";
import amountHandler from "@/src/utils/amountHandler";

type TransactionTableProps = {
    type: TransactionType;
};

export const TransactionTable: React.FC<TransactionTableProps> = ({ type }) => {
    const [user, setUser] = useAtom(userAtom);
    const [isEditMode, setIsEditMode] = useState(false);
    const [sortType, setSortType] = useState<TransactionFilter>(TransactionFilter.AmountDESC);

    const transactions = type === TransactionType.INCOMES ? user?.incomes : user?.expenses;
    const urlParam = type === TransactionType.INCOMES ? DynamicUrlParams.INCOMES : DynamicUrlParams.EXPENSES;

    const total = useMemo(() => {
        if (!transactions) return 0;

        return transactions.reduce((acc, curr) => acc + curr.amount, 0);
    }, [transactions]);

    const sortedTransactions = useMemo(() => {
        if (!transactions) return [];

        return [...transactions].sort((a, b) => {
            switch (sortType) {
                case TransactionFilter.LabelDESC:
                    return a.label.localeCompare(b.label);
                case TransactionFilter.LabelASC:
                    return b.label.localeCompare(a.label);
                case TransactionFilter.AmountASC:
                    return a.amount - b.amount;
                case TransactionFilter.AmountDESC:
                default:
                    return b.amount - a.amount;
            }
        });
    }, [transactions, sortType]);

    const handleDelete = (transaction: ITransaction) => {
        if (user && transaction._id) {
            TransactionApi.delete(transaction._id, urlParam).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    const newUser = { ...user };

                    newUser[urlParam] = newUser[urlParam].filter((t) => t._id !== transaction._id);
                    setUser(newUser);
                }
            });
        }
    };

    const toggleLabelSort = () => {
        setSortType((prevType) => (prevType === TransactionFilter.LabelDESC ? TransactionFilter.LabelASC : TransactionFilter.LabelDESC));
    };

    const toggleAmountSort = () => {
        setSortType((prevType) => (prevType === TransactionFilter.AmountDESC ? TransactionFilter.AmountASC : TransactionFilter.AmountDESC));
    };

    if (!transactions || !user) return null;

    return (
        <Card className='flex w-full flex-col rounded-md p-4 md:w-1/2'>
            <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>{type}</h2>

                <div className='flex items-center gap-2'>
                    <Switch checked={isEditMode} onClick={() => setIsEditMode(!isEditMode)} />
                    <MdModeEdit className='fill-gray-500 dark:fill-white' />
                </div>
            </div>

            <div className='mb-4 px-2'>
                {sortedTransactions.length > 0 ? (
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className={cn("pb-1 text-left text-sm uppercase", !isEditMode ? "w-5/12" : "w-5/12")}>
                                    Label
                                    <button onClick={toggleLabelSort}>
                                        <IoChevronDownOutline
                                            className={cn("ml-1 h-3 w-3", sortType === TransactionFilter.LabelASC ? "rotate-180" : "rotate-0")}
                                        />
                                    </button>
                                </th>
                                <th className={cn("pb-1 text-right text-sm uppercase", !isEditMode ? "w-7/12" : "w-5/12")}>
                                    Montant
                                    <button onClick={toggleAmountSort}>
                                        <IoChevronDownOutline
                                            className={cn("ml-1 h-3 w-3", sortType === TransactionFilter.AmountASC ? "rotate-180" : "rotate-0")}
                                        />
                                    </button>
                                </th>
                                {isEditMode && <th className='w-2/12 text-right text-sm uppercase'>Actions</th>}
                            </tr>
                        </thead>

                        <tbody>
                            {sortedTransactions.map((transaction, index) => (
                                <tr key={index} className='border-b border-t'>
                                    <td className='border-r px-4 py-1 text-left text-sm capitalize'>{transaction.label}</td>
                                    <td className={cn("px-4 py-1 text-right text-sm", isEditMode && "border-r")}>
                                        {amountHandler(transaction.amount, "EU", user.currency.symbol)}
                                    </td>
                                    {isEditMode && (
                                        <td
                                            onClick={() => handleDelete(transaction)}
                                            className='flex items-center justify-end px-4 pt-2 hover:cursor-pointer'>
                                            <MdDeleteForever className='fill-red-500 transition-all duration-150 hover:opacity-50' />
                                        </td>
                                    )}
                                </tr>
                            ))}
                            {total && (
                                <tr className='border-t'>
                                    <td className='border-r px-4 py-1 text-left text-base font-bold uppercase'>Total</td>
                                    <td className='px-4 py-1 text-right text-base font-bold'>{amountHandler(total, "EU", user.currency.symbol)}</td>
                                    {isEditMode && <td className='px-4 py-1 text-right text-sm font-bold'></td>}
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <p className='mt-8 text-center text-xs italic'>Aucune transaction enregistrée.</p>
                )}
            </div>

            <TransactionForm type={type} user={user} setUser={setUser} />
        </Card>
    );
};
