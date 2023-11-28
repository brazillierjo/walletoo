import BalanceTable from "@/src/components/Wallet/BalanceTable";
import { TransactionTable } from "@/src/components/Wallet/TransactionTable";
import { TransactionType } from "@/src/enums/transactionType";

const Wallet: React.FC = () => {
    return (
        <div className='flex w-full flex-col gap-6'>
            <h1 className='shrink text-xl font-bold'>Mon Wallet personnel</h1>

            <div className='flex flex-col justify-evenly gap-8 md:flex-row'>
                <TransactionTable type={TransactionType.INCOMES} />
                <TransactionTable type={TransactionType.EXPENSES} />
            </div>

            <BalanceTable />
        </div>
    );
};

export default Wallet;
