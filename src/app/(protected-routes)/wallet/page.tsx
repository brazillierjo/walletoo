"use client";

import { panelAtom } from "@/src/atoms/panel.atom";
import { selectedOperationAtom } from "@/src/atoms/selectedOperation.atom";
import Panel from "@/src/components/Commons/Panel";
import BalanceTable from "@/src/components/Wallet/BalanceTable";
import { EditOperationForm } from "@/src/components/Wallet/EditOperationForm";
import { OperationTable } from "@/src/components/Wallet/OperationTable";
import { OperationType } from "@/src/enums/operationType";
import { useAtom } from "jotai";

const Wallet: React.FC = () => {
  const [showPanel, setShowPanel] = useAtom(panelAtom);
  const [selectedOperation] = useAtom(selectedOperationAtom);

  return (
    <div className="relative flex w-full flex-col gap-6">
      <h1 className="shrink text-xl font-bold">Mon Wallet personnel</h1>

      <div className="flex flex-col justify-evenly gap-8 md:flex-row">
        <OperationTable type={OperationType.INCOMES} />
        <OperationTable type={OperationType.EXPENSES} />
      </div>

      <BalanceTable />

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
