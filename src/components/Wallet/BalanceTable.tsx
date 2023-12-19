"use client";

import { userAtom } from "@/src/atoms/user.atom";
import FormattedOperation from "@/src/components/Commons/FormattedOperation";
import { Card } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/src/components/ui/table";
import { makeCardOpacity } from "@/src/utils/animations";
import { cn } from "@/src/utils/tailwindMerge";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

const BalanceTable: React.FC = () => {
  const [user] = useAtom(userAtom);
  if (!user) return null;

  const calculateTotal = (operations: Array<{ amount: number }>) => {
    return operations.reduce((acc, operation) => acc + operation.amount, 0);
  };

  const totalIncomes = calculateTotal(user.incomes);
  const totalExpenses = calculateTotal(user.expenses);
  const netIncome = totalIncomes - totalExpenses;
  const financialRatio = (totalExpenses / totalIncomes) * 100;

  if (user.incomes.length === 0 && user.expenses.length === 0) return null;

  return (
    <motion.div className="flex h-full w-full" initial="hidden" animate="visible" variants={makeCardOpacity(0.6)}>
      <Card className="w-full rounded-lg p-4">
        <h2 className="mb-4 text-lg font-semibold">Récapituliatif</h2>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Total des revenus :</TableCell>
              <TableCell className="text-right">
                <FormattedOperation amount={totalIncomes} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Total des dépenses :</TableCell>
              <TableCell className="text-right">
                <FormattedOperation amount={totalExpenses} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Montant restant :</TableCell>
              <TableCell
                className={cn("text-right text-lg font-bold", netIncome >= 0 ? "text-green-600" : "text-red-500")}
              >
                <FormattedOperation amount={netIncome} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Taux de charge financière :</TableCell>
              <TableCell className="text-right">{financialRatio.toFixed(2)}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};

export default BalanceTable;
