"use client";

import { useMemo, useState } from "react";
import { panelAtom } from "@/src/atoms/panel.atom";
import { userAtom } from "@/src/atoms/user.atom";
import Panel from "@/src/components/Commons/Panel";
import { Card } from "@/src/components/ui/card";
import { Table } from "@/src/components/ui/table";
import { CreateTransactionForm } from "@/src/components/Wallet/CreateTransactionForm";
import { EditTransactionForm } from "@/src/components/Wallet/EditTransactionForm";
import {
  TransactionTableBody,
  TransactionTableFooter,
  TransactionTableHeader,
} from "@/src/components/Wallet/TableComposer";
import { TransactionFilter } from "@/src/enums/transactionFilter";
import { TransactionType } from "@/src/enums/transactionType";
import { ITransaction } from "@/src/interfaces/transactionInterface";
import { makeCardOpacity } from "@/src/utils/animations";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

type TransactionTableProps = {
  type: TransactionType;
};

export const TransactionTable: React.FC<TransactionTableProps> = ({ type }) => {
  const [user, setUser] = useAtom(userAtom);
  const [showPanel, setShowPanel] = useAtom(panelAtom);
  const [sortType, setSortType] = useState<TransactionFilter>(TransactionFilter.AmountDESC);
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);

  const transactions = type === TransactionType.INCOMES ? user?.incomes : user?.expenses;

  const handleSelectedTransaction = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setShowPanel(true);
  };

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
      {showPanel && selectedTransaction && (
        <Panel onClose={() => setShowPanel(false)}>
          <EditTransactionForm type={type} transaction={selectedTransaction} closePanel={() => setShowPanel(false)} />
        </Panel>
      )}

      <Card className="flex h-full flex-col rounded-md p-4">
        <h2 className="mb-4 text-lg font-semibold">{type}</h2>

        <div className="mb-4 px-2">
          {sortedTransactions.length > 0 ? (
            <Table>
              <TransactionTableHeader
                toggleLabelSort={toggleLabelSort}
                toggleAmountSort={toggleAmountSort}
                sortType={sortType}
              />

              <TransactionTableBody
                sortedTransactions={sortedTransactions}
                handleSelectedTransaction={handleSelectedTransaction}
              />

              <TransactionTableFooter total={total} />
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
