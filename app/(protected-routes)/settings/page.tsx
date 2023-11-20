import { DeleteAccountCard } from "@/src/components/Settings/DeleteAccountCard";

const Settings: React.FC = () => {
    return (
        <div className='flex w-full flex-col gap-6'>
            <h1 className='shrink text-xl font-bold'>Mes paramètres</h1>

            <div className='flex justify-start gap-3'>
                <DeleteAccountCard />
            </div>
        </div>
    );
};

export default Settings;
