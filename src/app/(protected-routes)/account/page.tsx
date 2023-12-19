import { DeleteAccountCard } from "@/src/components/Account/DeleteAccountCard";
import { MyAccountCard } from "@/src/components/Account/MyAccountCard";
import { ResetUserCard } from "@/src/components/Account/ResetUserCard";
import { SettingsCard } from "@/src/components/Account/SettingsCard/SettingsCard";

const Account: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-6 p-4 lg:p-8">
      <h1 className="shrink text-xl font-bold">Mon compte</h1>

      <div className="flex flex-wrap gap-6">
        <MyAccountCard />
        <SettingsCard />
      </div>

      <div className="flex flex-wrap gap-6">
        <ResetUserCard />
        <DeleteAccountCard />
      </div>
    </div>
  );
};

export default Account;
