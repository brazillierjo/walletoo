import { userAtom } from "@/src/atoms/user.atom";
import SpinnerLoadingScreen from "@/src/components/Commons/LoadingScreen";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { OperationType, OperationTypeLabel } from "@/src/enums/operationType";
import { makeCardOpacity } from "@/src/utils/animations";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

export const OperationByCategories = () => {
  const [user] = useAtom(userAtom);

  const uniqueUserIncomesCategories = Array.from(new Set(user?.incomes.map((income) => income.category)));
  console.log("uniqueUserIncomesCategories", uniqueUserIncomesCategories);
  const uniqueUserExpensesCategories = Array.from(new Set(user?.expenses.map((expense) => expense.category)));

  if (!user) return <SpinnerLoadingScreen />;

  return (
    <motion.div className="flex w-full lg:w-1/2" initial="hidden" animate="visible" variants={makeCardOpacity(0.6)}>
      <Card className="w-full rounded-lg p-4">
        <Tabs defaultValue={OperationType.INCOMES}>
          <TabsList>
            <TabsTrigger value={OperationType.INCOMES}>{OperationTypeLabel.INCOMES}</TabsTrigger>
            <TabsTrigger value={OperationType.EXPENSES}>{OperationTypeLabel.EXPENSES}</TabsTrigger>
          </TabsList>

          <TabsContent className="flex flex-nowrap gap-4 overflow-x-auto py-2" value={OperationType.INCOMES}>
            {uniqueUserIncomesCategories.map((category) => (
              <Card key={category} className="w-full min-w-[250px] rounded-lg p-4">
                <h4 className="mb-3 font-semibold">{category ?? "Non catégorisés"}</h4>

                <div className="flex flex-col gap-1">
                  {user.incomes
                    .filter((income) => income.category === category)
                    .map((income) => (
                      <Button variant="secondary" className="flex w-full justify-between" key={income._id}>
                        <p>{income.label}</p>
                        <p>{income.amount}</p>
                      </Button>
                    ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent className="flex flex-nowrap gap-4 overflow-x-auto py-2" value={OperationType.EXPENSES}>
            {uniqueUserExpensesCategories.map((category) => (
              <Card key={category} className="w-full min-w-[250px] rounded-lg p-4">
                <h4 className="mb-3 font-semibold">{category ?? "Non catégorisés"}</h4>

                <div className="flex flex-col gap-1">
                  {user.expenses
                    .filter((expenses) => expenses.category === category)
                    .map((expenses) => (
                      <Button variant="secondary" className="flex w-full justify-between" key={expenses._id}>
                        <p>{expenses.label}</p>
                        <p>{expenses.amount}</p>
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
