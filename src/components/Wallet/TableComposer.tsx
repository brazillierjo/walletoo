import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { ITransaction } from "@/src/interfaces/transactionInterface";
import FormattedTransaction from "@/src/components/Commons/FormattedTransaction";
import { IoChevronDownOutline } from "react-icons/io5";
import { TransactionFilter } from "@/src/enums/transactionFilter";
import { cn } from "@/src/utils/tailwindMerge";
import { Button } from "../ui/button";

type TableHeadProps = {
    toggleLabelSort: () => void;
    toggleAmountSort: () => void;
    sortType: TransactionFilter;
};

export const TableHead: React.FC<TableHeadProps> = ({ toggleLabelSort, toggleAmountSort, sortType }) => {
    return (
        <tr>
            <th className='pb-1 text-left text-sm uppercase'>
                Label
                <button onClick={toggleLabelSort}>
                    <IoChevronDownOutline className={cn("ml-1 h-3 w-3", sortType === TransactionFilter.LabelASC ? "rotate-180" : "rotate-0")} />
                </button>
            </th>
            <th className='pb-1 text-right text-sm uppercase'>
                Montant
                <button onClick={toggleAmountSort}>
                    <IoChevronDownOutline className={cn("ml-1 h-3 w-3", sortType === TransactionFilter.AmountASC ? "rotate-180" : "rotate-0")} />
                </button>
            </th>
        </tr>
    );
};

type TransactionRowProps = {
    transaction: ITransaction;
    onDelete: (transaction: ITransaction) => void;
};

export const TableRow: React.FC<TransactionRowProps> = ({ transaction, onDelete }) => {
    return (
        <tr className='border-b hover:bg-gray-100 hover:dark:bg-gray-700'>
            <td className='flex items-center gap-3 px-4 py-2 text-left text-sm capitalize'>
                <span>{transaction.label}</span>
                <Popover>
                    <PopoverTrigger>
                        <button className='rounded border border-gray-400 px-2 py-1 text-xs hover:bg-gray-200 dark:border-gray-300 hover:dark:bg-gray-600'>
                            Edit
                        </button>
                    </PopoverTrigger>

                    <PopoverContent>
                        <div className='text-center'>
                            <Button variant='destructive' onClick={() => onDelete(transaction)}>
                                Delete
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </td>

            <td className='px-4 py-1 text-right text-sm'>
                <FormattedTransaction amount={transaction.amount} />
            </td>
        </tr>
    );
};
