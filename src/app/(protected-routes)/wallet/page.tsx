"use client";

import { panelAtom } from "@/src/atoms/panel.atom";
import { selectedOperationAtom } from "@/src/atoms/selectedOperation.atom";
import PieChart from "@/src/components/Charts/PieChart";
import Panel from "@/src/components/Commons/Panel";
import BalanceTable from "@/src/components/Wallet/BalanceTable";
import { EditOperationForm } from "@/src/components/Wallet/EditOperationForm";
import { OperationTable } from "@/src/components/Wallet/OperationTable";
import { OperationByCategories } from "@/src/components/Widgets/OperationByCategories";
import { OperationTypeLabel } from "@/src/enums/operationType";
import { useAtom } from "jotai";

const Wallet: React.FC = () => {
  const [showPanel, setShowPanel] = useAtom(panelAtom);
  const [selectedOperation] = useAtom(selectedOperationAtom);

  return (
    <div className="relative flex w-full flex-col gap-6">
      <h1 className="shrink text-xl font-bold">Mon Wallet personnel</h1>

      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <OperationTable type={OperationTypeLabel.INCOMES} />
        <OperationTable type={OperationTypeLabel.EXPENSES} />
      </div>

      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <OperationByCategories />
        <BalanceTable />
      </div>

      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <div className="w-full md:w-1/2">
          <PieChart
            title="Répartition des revenus"
            data={[44, 55, 13, 43, 22]}
            labels={["Équipe A", "Équipe B", "Équipe C", "Équipe D", "Équipe E"]}
          />
        </div>
      </div>

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
