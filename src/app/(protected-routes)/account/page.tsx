import { DeleteAccountCard } from "@/src/components/Account/DeleteAccountCard";
import { MyAccountCard } from "@/src/components/Account/MyAccountCard";
import { ResetUserCard } from "@/src/components/Account/ResetUserCard";

const Profile: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="shrink text-xl font-bold">Mon compte</h1>

      <div className="flex flex-wrap gap-6">
        <MyAccountCard />
        <ResetUserCard />
        <DeleteAccountCard />
      </div>
    </div>
  );
};

export default Profile;
