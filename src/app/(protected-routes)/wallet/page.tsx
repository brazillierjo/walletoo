"use client";

import { useState } from "react";
import { selectedOperationPanelAtom } from "@/src/atoms/panel.atom";
import { selectedOperationAtom } from "@/src/atoms/selectedOperation.atom";
import { userAtom } from "@/src/atoms/user.atom";
import PieChart from "@/src/components/Charts/PieChart";
import Panel from "@/src/components/Commons/Panel";
import { Button } from "@/src/components/ui/button";
import BalanceTable from "@/src/components/Wallet/BalanceTable";
import { EditOperationForm } from "@/src/components/Wallet/EditOperationForm";
import { OperationTable } from "@/src/components/Wallet/OperationTable";
import { OperationByCategories } from "@/src/components/Widgets/OperationByCategories";
import { OperationTypeLabel } from "@/src/enums/operationType";
import { useAtom } from "jotai";
import { FaChartSimple } from "react-icons/fa6";

const Wallet: React.FC = () => {
  const [areChartsDisplay, setAreChartsDisplay] = useState(false);
  const [user] = useAtom(userAtom);
  const [showPanel, setShowPanel] = useAtom(selectedOperationPanelAtom);
  const [selectedOperation] = useAtom(selectedOperationAtom);

  const incomesLabels = user?.incomes.map((operation) => operation.label);
  const incomesData = user?.incomes.map((operation) => operation.amount);
  const expensesLabels = user?.expenses.map((operation) => operation.label);
  const expensesData = user?.expenses.map((operation) => operation.amount);

  if (!user) return null;

  return (
    <div className="flex w-full flex-col gap-6 p-4 lg:p-8">
      <h1 className="shrink text-xl font-bold">Mon Wallet personnel</h1>

      <div className="flex justify-between gap-10">
        <div className="flex w-full flex-col items-start gap-5 md:w-1/2">
          <OperationTable type={OperationTypeLabel.INCOMES} />
          <OperationTable type={OperationTypeLabel.EXPENSES} />
        </div>

        {user?.incomes.length > 0 && user?.expenses.length > 0 && (
          <div className="flex w-full flex-col items-start gap-5 md:w-1/2">
            <OperationByCategories />
            <BalanceTable />
          </div>
        )}
      </div>

      {areChartsDisplay ? (
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div className="w-full md:w-1/2">
            <PieChart title="Répartition des revenus" labels={incomesLabels ?? []} data={incomesData ?? []} />
          </div>
          <div className="w-full md:w-1/2">
            <PieChart title="Répartition des dépenses" labels={expensesLabels ?? []} data={expensesData ?? []} />
          </div>
        </div>
      ) : user.incomes.length > 0 && user.expenses.length > 0 ? (
        <Button className="mx-auto flex w-fit items-center gap-2" onClick={() => setAreChartsDisplay(true)}>
          Afficher les graphiques <FaChartSimple />
        </Button>
      ) : (
        <small className="text-center italic opacity-80">
          Ajouter des opérations pour voir les détails et analyses de celles-ci.
        </small>
      )}

      {showPanel && selectedOperation && (
        <Panel key={selectedOperation.operation._id} onClose={() => setShowPanel(false)}>
          <EditOperationForm
            type={selectedOperation.type}
            operation={selectedOperation.operation}
            closePanel={() => setShowPanel(false)}
          />
        </Panel>
      )}
    </div>
  );
};

export default Wallet;
