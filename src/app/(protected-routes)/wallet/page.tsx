"use client";

import { useState } from "react";
import { panelAtom } from "@/src/atoms/panel.atom";
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
  const [showPanel, setShowPanel] = useAtom(panelAtom);
  const [selectedOperation] = useAtom(selectedOperationAtom);

  const incomesLabels = user?.incomes.map((operation) => operation.label);
  const incomesData = user?.incomes.map((operation) => operation.amount);

  const expensesLabels = user?.expenses.map((operation) => operation.label);
  const expensesData = user?.expenses.map((operation) => operation.amount);

  return (
    <div className="relative flex w-full flex-col gap-6">
      <h1 className="shrink text-xl font-bold">Mon Wallet personnel</h1>

      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <OperationTable type={OperationTypeLabel.INCOMES} />
        <OperationTable type={OperationTypeLabel.EXPENSES} />
      </div>

      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <div className="w-full md:w-3/5">
          <OperationByCategories />
        </div>
        <div className="w-full md:w-2/5">
          <BalanceTable />
        </div>
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
      ) : (
        <Button className="mx-auto flex w-fit items-center gap-2" onClick={() => setAreChartsDisplay(true)}>
          Afficher les graphiques <FaChartSimple />
        </Button>
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
