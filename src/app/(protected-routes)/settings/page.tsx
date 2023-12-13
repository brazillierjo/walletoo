import { SettingsCard } from "@/src/components/Settings/SettingsCard";

const Settings: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="shrink text-xl font-bold">Mes paramètres</h1>

      <SettingsCard />
    </div>
  );
};

export default Settings;
