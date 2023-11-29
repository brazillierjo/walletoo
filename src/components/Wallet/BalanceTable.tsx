"use client"

import { userAtom } from "@/src/atoms/user.atom"
import FormattedTransaction from "@/src/components//Commons/FormattedTransaction"
import { Card } from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { makeCardOpacity } from "@/src/utils/animations"
import { motion } from "framer-motion"
import { useAtom } from "jotai"

const BalanceTable: React.FC = () => {
  const [user] = useAtom(userAtom)
  if (!user) return null

  const calculateTotal = (transactions: Array<{ amount: number }>) => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
  }

  const totalIncomes = calculateTotal(user.incomes)
  const totalExpenses = calculateTotal(user.expenses)
  const netIncome = totalIncomes - totalExpenses

  if (user.incomes.length === 0 && user.expenses.length === 0) return null

  return (
    <motion.div
      className="flex justify-center gap-5"
      initial="hidden"
      animate="visible"
      variants={makeCardOpacity(0.4)}
    >
      <Card className="w-full rounded-lg p-4 lg:w-2/5">
        <h2 className="mb-4 text-lg font-semibold">Récapitulatif</h2>

        <div className="mb-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h3>Total des revenus :</h3>
            <p className="font-bold">
              <FormattedTransaction amount={totalIncomes} />
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h3>Total des dépenses :</h3>
            <p className="font-bold">
              <FormattedTransaction amount={totalExpenses} />
            </p>
          </div>
        </div>

        <Separator />

        <div className="mt-4 flex items-center justify-between">
          <h3>Restant à la fin du mois :</h3>
          <p className={`font-bold ${netIncome >= 0 ? "text-green-500" : "text-red-500"}`}>
            <FormattedTransaction amount={netIncome} />
          </p>
        </div>
      </Card>
    </motion.div>
  )
}

export default BalanceTable
