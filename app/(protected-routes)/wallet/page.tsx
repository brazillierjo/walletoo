"use client";

const Wallet: React.FC = () => {
    return (
        <div className='flex w-full flex-col gap-6'>
            <h1 className='text-navy-700 shrink text-xl font-bold dark:text-white'>Mon Wallet personnel</h1>

            <div className='flex justify-evenly gap-3'>
                {/* <CardTable title='Revenus' transactions={incomes} />
                <CardTable title='Dépenses' transactions={expenses} /> */}
            </div>
        </div>
    );
};

export default Wallet;
