import { selectedOperationPanelAtom } from "@/src/atoms/panel.atom";
import { selectedOperationAtom } from "@/src/atoms/selectedOperation.atom";
import { userAtom } from "@/src/atoms/user.atom";
import FormattedOperation from "@/src/components/Commons/FormattedOperation";
import SpinnerLoadingScreen from "@/src/components/Commons/LoadingScreen";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { OperationType, OperationTypeLabel } from "@/src/enums/operationType";
import { IOperation } from "@/src/interfaces/operationInterface";
import { makeCardOpacity } from "@/src/utils/animations";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

export const OperationByCategories = () => {
  const [user] = useAtom(userAtom);
  const [, setSelectedOperation] = useAtom(selectedOperationAtom);
  const [, setShowPanel] = useAtom(selectedOperationPanelAtom);

  const handleSelectedOperation = (type: OperationTypeLabel, operation: IOperation) => {
    setSelectedOperation({ type, operation });
    setShowPanel(true);
  };

  const uniqueUserIncomesCategories = Array.from(new Set(user?.incomes.map((income) => income.category)));
  const uniqueUserExpensesCategories = Array.from(new Set(user?.expenses.map((expense) => expense.category)));

  if (!user) return <SpinnerLoadingScreen />;

  return (
    <motion.div className="flex h-full w-full" initial="hidden" animate="visible" variants={makeCardOpacity(0.4)}>
      <Card className="w-full p-4">
        <Tabs defaultValue={OperationType.INCOMES}>
          <TabsList>
            <TabsTrigger value={OperationType.INCOMES}>{OperationTypeLabel.INCOMES}</TabsTrigger>
            <TabsTrigger value={OperationType.EXPENSES}>{OperationTypeLabel.EXPENSES}</TabsTrigger>
          </TabsList>

          <TabsContent className="flex max-h-[450px] flex-col gap-4 overflow-y-auto" value={OperationType.INCOMES}>
            {uniqueUserIncomesCategories.map((category) => (
              <Card key={category} className="w-full border-0 p-1 shadow-none">
                <h4 className="mb-3 font-semibold">{category ?? "Non catégorisés"}</h4>

                <div className="flex flex-col gap-1">
                  {user.incomes
                    .filter((income) => income.category === category)
                    .map((income) => (
                      <Button
                        variant="gray"
                        className="flex w-full justify-between gap-4"
                        key={income._id}
                        onClick={() => handleSelectedOperation(OperationTypeLabel.INCOMES, income)}
                      >
                        <p>{income.label}</p>
                        <p>
                          <FormattedOperation amount={income.amount} />
                        </p>
                      </Button>
                    ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent className="flex max-h-[450px] flex-col gap-4 overflow-y-auto" value={OperationType.EXPENSES}>
            {uniqueUserExpensesCategories.map((category) => (
              <Card key={category} className="w-full border-0 p-1 shadow-none">
                <h4 className="mb-3 font-semibold">{category ?? "Non catégorisés"}</h4>

                <div className="flex flex-col gap-1">
                  {user.expenses
                    .filter((expense) => expense.category === category)
                    .map((expense) => (
                      <Button
                        variant="gray"
                        className="flex w-full justify-between gap-4"
                        key={expense._id}
                        onClick={() => handleSelectedOperation(OperationTypeLabel.EXPENSES, expense)}
                      >
                        <p>{expense.label}</p>
                        <p>
                          <FormattedOperation amount={expense.amount} />
                        </p>
                      </Button>
                    ))}
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};
