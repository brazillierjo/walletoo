"use client";

import { useMemo, useState } from "react";
import { userAtom } from "@/src/atoms/user.atom";
import { Card } from "@/src/components/ui/card";
import { Table } from "@/src/components/ui/table";
import { CreateOperationForm } from "@/src/components/Wallet/CreateOperationForm";
import { OperationTableBody, OperationTableFooter, OperationTableHeader } from "@/src/components/Wallet/TableComposer";
import { OperationFilter } from "@/src/enums/operationFilter";
import { OperationType } from "@/src/enums/operationType";
import { makeCardOpacity } from "@/src/utils/animations";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

type OperationTableProps = {
  type: OperationType;
};

export const OperationTable: React.FC<OperationTableProps> = ({ type }) => {
  const [user, setUser] = useAtom(userAtom);
  const [sortType, setSortType] = useState<OperationFilter>(OperationFilter.AmountDESC);

  const operations = type === OperationType.INCOMES ? user?.incomes : user?.expenses;

  const total = useMemo(() => {
    if (!operations) return 0;

    return operations.reduce((acc, curr) => acc + curr.amount, 0);
  }, [operations]);

  const sortedOperations = useMemo(() => {
    if (!operations) return [];

    return [...operations].sort((a, b) => {
      switch (sortType) {
        case OperationFilter.LabelDESC:
          return a.label.localeCompare(b.label);
        case OperationFilter.LabelASC:
          return b.label.localeCompare(a.label);
        case OperationFilter.AmountASC:
          return a.amount - b.amount;
        case OperationFilter.AmountDESC:
        default:
          return b.amount - a.amount;
      }
    });
  }, [operations, sortType]);

  const toggleLabelSort = () => {
    setSortType((prevType) =>
      prevType === OperationFilter.LabelDESC ? OperationFilter.LabelASC : OperationFilter.LabelDESC
    );
  };

  const toggleAmountSort = () => {
    setSortType((prevType) =>
      prevType === OperationFilter.AmountDESC ? OperationFilter.AmountASC : OperationFilter.AmountDESC
    );
  };

  if (!operations || !user) return null;

  return (
    <>
      <motion.div
        className="w-full"
        initial="hidden"
        animate="visible"
        variants={type === OperationType.EXPENSES ? makeCardOpacity(0.2) : makeCardOpacity()}
      >
        <Card className="flex h-full flex-col rounded-md p-4">
          <h2 className="mb-4 text-lg font-semibold">{type}</h2>

          <div className="mb-4 px-2">
            {sortedOperations.length > 0 ? (
              <Table>
                <OperationTableHeader
                  toggleLabelSort={toggleLabelSort}
                  toggleAmountSort={toggleAmountSort}
                  sortType={sortType}
                />

                <OperationTableBody type={type} sortedOperations={sortedOperations} />

                <OperationTableFooter total={total} />
              </Table>
            ) : (
              <p className="mt-8 text-center text-xs italic">Aucune transaction enregistrée.</p>
            )}
          </div>

          <CreateOperationForm type={type} user={user} setUser={setUser} />
        </Card>
      </motion.div>
    </>
  );
};
