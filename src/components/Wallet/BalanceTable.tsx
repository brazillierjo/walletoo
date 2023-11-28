"use client";
import { userAtom } from "@/src/atoms/user.atom";
import { useAtom } from "jotai";
import { Card } from "@/src/components/ui/card";
import FormattedTransaction from "../Commons/FormattedTransaction";
import { Separator } from "@/src/components/ui/separator";

const BalanceTable: React.FC = () => {
    const [user] = useAtom(userAtom);
    if (!user) return null;

    const calculateTotal = (transactions: Array<{ amount: number }>) => {
        return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    };

    const totalIncomes = calculateTotal(user.incomes);
    const totalExpenses = calculateTotal(user.expenses);
    const netIncome = totalIncomes - totalExpenses;

    return (
        <div className='flex justify-center gap-5'>
            <Card className='w-full rounded-lg p-4 lg:w-2/5'>
                <h2 className='mb-4 text-lg font-semibold'>Récapitulatif</h2>

                <div className='mb-4 flex flex-col'>
                    <div className='flex items-center justify-between'>
                        <h3>Total des revenus :</h3>
                        <p className='font-bold'>
                            <FormattedTransaction amount={totalIncomes} />
                        </p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h3>Total des dépenses :</h3>
                        <p className='font-bold'>
                            <FormattedTransaction amount={totalExpenses} />
                        </p>
                    </div>
                </div>

                <Separator />

                <div className='mt-4 flex items-center justify-between'>
                    <h3>Restant à la fin du mois :</h3>
                    <p className={`font-bold ${netIncome >= 0 ? "text-green-500" : "text-red-500"}`}>
                        <FormattedTransaction amount={netIncome} />
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default BalanceTable;
