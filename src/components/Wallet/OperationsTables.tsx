import { useMemo, useState } from "react";
import { userAtom } from "@/src/atoms/user.atom";
import { Card } from "@/src/components/ui/card";
import { Table } from "@/src/components/ui/table";
import { CreateOperationForm } from "@/src/components/Wallet/CreateOperationForm";
import { OperationTableBody, OperationTableFooter, OperationTableHeader } from "@/src/components/Wallet/TableComposer";
import { OperationFilter } from "@/src/enums/operationFilter";
import { OperationType, OperationTypeLabel } from "@/src/enums/operationType";
import { makeCardOpacity } from "@/src/utils/animations";
import { cn } from "@/src/utils/tailwindMerge";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

import { Button } from "../ui/button";

export const OperationsTables: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);
  if (!user) return null;

  const [type, setType] = useState<OperationType>(OperationType.INCOMES);
  const [sortType, setSortType] = useState<OperationFilter>(OperationFilter.AmountDESC);

  const operations = type === OperationType.INCOMES ? user?.incomes : user?.expenses;

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

  const total = useMemo(() => {
    if (!operations) return 0;

    return operations.reduce((acc, curr) => acc + curr.amount, 0);
  }, [operations]);

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

  return (
    <motion.div className="w-full" initial="hidden" animate="visible" variants={makeCardOpacity()}>
      <Card className="flex h-full flex-col p-4">
        <div className="flex w-fit gap-3 rounded-md bg-secondary p-1">
          <Button
            variant="ghost"
            className={cn(type === OperationType.INCOMES && "bg-background", "h-7")}
            onClick={() => setType(OperationType.INCOMES)}
          >
            {OperationTypeLabel.INCOMES}
          </Button>

          <Button
            variant="ghost"
            className={cn(type === OperationType.EXPENSES && "bg-background", "h-7")}
            onClick={() => setType(OperationType.EXPENSES)}
          >
            {OperationTypeLabel.EXPENSES}
          </Button>
        </div>

        <div className="mb-4 px-2">
          {sortedOperations.length > 0 ? (
            <Table>
              <OperationTableHeader
                toggleLabelSort={toggleLabelSort}
                toggleAmountSort={toggleAmountSort}
                sortType={sortType}
              />

              <OperationTableBody type={OperationTypeLabel.INCOMES} sortedOperations={sortedOperations} />

              <OperationTableFooter total={total} />
            </Table>
          ) : (
            <p className="mt-8 text-center text-xs italic">Aucune transaction enregistrée.</p>
          )}
        </div>

        <CreateOperationForm type={OperationTypeLabel.INCOMES} user={user} setUser={setUser} />
      </Card>
    </motion.div>
  );
};
