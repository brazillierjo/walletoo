"use client"

import { useMemo, useState } from "react"
import { TransactionApi } from "@/src/APIs/transactionApi"
import { userAtom } from "@/src/atoms/user.atom"
import FormattedTransaction from "@/src/components/Commons/FormattedTransaction"
import { Card } from "@/src/components/ui/card"
import { DynamicUrlParams } from "@/src/enums/dynamicUrlParams"
import { TransactionFilter } from "@/src/enums/transactionFilter"
import { TransactionType } from "@/src/enums/transactionType"
import { ITransaction } from "@/src/interfaces/transactionInterface"
import { makeCardOpacity } from "@/src/utils/animations"
import { motion } from "framer-motion"
import { useAtom } from "jotai"

import { TableHead, TableRow } from "./TableComposer"
import { TransactionForm } from "./TransactionForm"

type TransactionTableProps = {
  type: TransactionType
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ type }) => {
  const [user, setUser] = useAtom(userAtom)
  const [sortType, setSortType] = useState<TransactionFilter>(TransactionFilter.AmountDESC)

  const transactions = type === TransactionType.INCOMES ? user?.incomes : user?.expenses
  const urlParam = type === TransactionType.INCOMES ? DynamicUrlParams.INCOMES : DynamicUrlParams.EXPENSES

  const total = useMemo(() => {
    if (!transactions) return 0

    return transactions.reduce((acc, curr) => acc + curr.amount, 0)
  }, [transactions])

  const sortedTransactions = useMemo(() => {
    if (!transactions) return []

    return [...transactions].sort((a, b) => {
      switch (sortType) {
        case TransactionFilter.LabelDESC:
          return a.label.localeCompare(b.label)
        case TransactionFilter.LabelASC:
          return b.label.localeCompare(a.label)
        case TransactionFilter.AmountASC:
          return a.amount - b.amount
        case TransactionFilter.AmountDESC:
        default:
          return b.amount - a.amount
      }
    })
  }, [transactions, sortType])

  const handleDelete = (transaction: ITransaction) => {
    if (user && transaction._id) {
      TransactionApi.delete(transaction._id, urlParam).then((res) => {
        if (res.status === 200) {
          const newUser = { ...user }

          newUser[urlParam] = newUser[urlParam].filter((t) => t._id !== transaction._id)
          setUser(newUser)
        }
      })
    }
  }

  const toggleLabelSort = () => {
    setSortType((prevType) =>
      prevType === TransactionFilter.LabelDESC ? TransactionFilter.LabelASC : TransactionFilter.LabelDESC
    )
  }

  const toggleAmountSort = () => {
    setSortType((prevType) =>
      prevType === TransactionFilter.AmountDESC ? TransactionFilter.AmountASC : TransactionFilter.AmountDESC
    )
  }

  if (!transactions || !user) return null

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={type === TransactionType.EXPENSES ? makeCardOpacity(0.2) : makeCardOpacity()}
    >
      <Card className="flex h-full flex-col rounded-md p-4">
        <h2 className="mb-4 text-lg font-semibold">{type}</h2>

        <div className="mb-4 px-2">
          {sortedTransactions.length > 0 ? (
            <table className="w-full">
              <thead className="border-b">
                <TableHead toggleLabelSort={toggleLabelSort} toggleAmountSort={toggleAmountSort} sortType={sortType} />
              </thead>

              <tbody>
                {sortedTransactions.map((transaction, index) => (
                  <TableRow key={index} transaction={transaction} onDelete={handleDelete} />
                ))}
                {total && (
                  <tr className="border-t">
                    <td className="py-1 pl-2 text-left text-base font-bold uppercase">Total</td>
                    <td className="py-1 pr-2 text-right text-base font-bold">
                      <FormattedTransaction amount={total} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <p className="mt-8 text-center text-xs italic">Aucune transaction enregistrée.</p>
          )}
        </div>

        <TransactionForm type={type} user={user} setUser={setUser} />
      </Card>
    </motion.div>
  )
}
