import { CardTable } from "@/src/components/Wallet/CardTable";

const Wallet: React.FC = () => {
    return (
        <div className='flex w-full flex-col gap-6'>
            <h1 className='text-navy-700 shrink text-3xl font-bold dark:text-white'>Mon Wallet personnel</h1>

            <div className='flex justify-evenly gap-3'>
                <CardTable type='incomes' />
                <CardTable type='expenses' />
            </div>
        </div>
    );
};

export default Wallet;
