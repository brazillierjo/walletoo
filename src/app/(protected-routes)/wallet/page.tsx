"use client";

import { selectedOperationPanelAtom } from "@/src/atoms/panel.atom";
import { selectedOperationAtom } from "@/src/atoms/selectedOperation.atom";
import { userAtom } from "@/src/atoms/user.atom";
import Panel from "@/src/components/Commons/Panel";
import BalanceTable from "@/src/components/Wallet/BalanceTable";
import { EditOperationForm } from "@/src/components/Wallet/EditOperationForm";
import { OperationByCategories } from "@/src/components/Wallet/OperationByCategories";
import { OperationTable } from "@/src/components/Wallet/OperationTable";
import { OperationTypeLabel } from "@/src/enums/operationType";
import { useAtom } from "jotai";

const Wallet: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [showPanel, setShowPanel] = useAtom(selectedOperationPanelAtom);
  const [selectedOperation] = useAtom(selectedOperationAtom);

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
