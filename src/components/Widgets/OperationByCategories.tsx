import { userAtom } from "@/src/atoms/user.atom";
import SpinnerLoadingScreen from "@/src/components/Commons/LoadingScreen";
import { Card } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { makeCardOpacity } from "@/src/utils/animations";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

export const OperationByCategories = () => {
  const [user] = useAtom(userAtom);

  if (!user) return <SpinnerLoadingScreen />;

  return (
    <motion.div className="flex" initial="hidden" animate="visible" variants={makeCardOpacity(0.6)}>
      <Card className="w-full rounded-lg p-4">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};
