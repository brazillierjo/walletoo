"use client";

import { userAtom } from "@/src/atoms/user.atom";
import FormattedOperation from "@/src/components/Commons/FormattedOperation";
import { Card } from "@/src/components/ui/card";
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

  if (user.incomes.length === 0 && user.expenses.length === 0) return null;

  return (
    <motion.div className="flex w-full lg:w-1/2" initial="hidden" animate="visible" variants={makeCardOpacity(0.4)}>
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
                className={cn("text-right text-lg font-bold", netIncome > 0 ? "text-green-600" : "text-red-500")}
              >
                <FormattedOperation amount={netIncome} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};

export default BalanceTable;
