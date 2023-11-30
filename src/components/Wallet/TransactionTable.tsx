"use client";

import { Fragment, useMemo, useState } from "react";
import { userAtom } from "@/src/atoms/user.atom";
import FormattedTransaction from "@/src/components/Commons/FormattedTransaction";
import { Card } from "@/src/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { CreateTransactionForm } from "@/src/components/Wallet/CreateTransactionForm";
import { TransactionFilter } from "@/src/enums/transactionFilter";
import { TransactionType } from "@/src/enums/transactionType";
import { makeCardOpacity } from "@/src/utils/animations";
import { cn } from "@/src/utils/tailwindMerge";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { IoChevronDownOutline } from "react-icons/io5";

type TransactionTableProps = {
  type: TransactionType;
};

export const TransactionTable: React.FC<TransactionTableProps> = ({ type }) => {
  const [user, setUser] = useAtom(userAtom);
  const [sortType, setSortType] = useState<TransactionFilter>(TransactionFilter.AmountDESC);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const transactions = type === TransactionType.INCOMES ? user?.incomes : user?.expenses;

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

  const toggleLabelSort = () => {
    setSortType((prevType) =>
      prevType === TransactionFilter.LabelDESC ? TransactionFilter.LabelASC : TransactionFilter.LabelDESC
    );
  };

  const toggleAmountSort = () => {
    setSortType((prevType) =>
      prevType === TransactionFilter.AmountDESC ? TransactionFilter.AmountASC : TransactionFilter.AmountDESC
    );
  };

  if (!transactions || !user) return null;

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Label
                    <button onClick={toggleLabelSort}>
                      <IoChevronDownOutline
                        className={cn(
                          "ml-1 h-3 w-3",
                          sortType === TransactionFilter.LabelASC ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </button>
                  </TableHead>
                  <TableHead className="pb-1 text-right text-sm uppercase">
                    Montant
                    <button onClick={toggleAmountSort}>
                      <IoChevronDownOutline
                        className={cn(
                          "ml-1 h-3 w-3",
                          sortType === TransactionFilter.AmountASC ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedTransactions.map((transaction, index) => (
                  <Fragment key={index}>
                    <TableRow className="cursor-pointer" onClick={() => setIsTransactionModalOpen(true)}>
                      <TableCell>{transaction.label}</TableCell>

                      <TableCell className="text-right">
                        <FormattedTransaction amount={transaction.amount} />
                      </TableCell>
                    </TableRow>
                  </Fragment>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell className="text-right">
                    <FormattedTransaction amount={total} />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ) : (
            <p className="mt-8 text-center text-xs italic">Aucune transaction enregistrée.</p>
          )}
        </div>

        <CreateTransactionForm type={type} user={user} setUser={setUser} />
      </Card>
    </motion.div>
  );
};
