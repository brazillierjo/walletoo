import FormattedTransaction from "@/src/components/Commons/FormattedTransaction";
import { TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { TransactionFilter } from "@/src/enums/transactionFilter";
import { ITransaction } from "@/src/interfaces/transactionInterface";
import { cn } from "@/src/utils/tailwindMerge";
import { IoChevronDownOutline } from "react-icons/io5";

// TABLE HEADER
type TransactionTableHeaderProps = {
  toggleLabelSort: () => void;
  toggleAmountSort: () => void;
  sortType: TransactionFilter;
};

export const TransactionTableHeader: React.FC<TransactionTableHeaderProps> = ({
  toggleLabelSort,
  toggleAmountSort,
  sortType,
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          Label
          <button onClick={toggleLabelSort}>
            <IoChevronDownOutline
              className={cn("ml-1 h-3 w-3", sortType === TransactionFilter.LabelASC ? "rotate-180" : "rotate-0")}
            />
          </button>
        </TableHead>
        <TableHead className="pb-1 text-right text-sm uppercase">
          Montant
          <button onClick={toggleAmountSort}>
            <IoChevronDownOutline
              className={cn("ml-1 h-3 w-3", sortType === TransactionFilter.AmountASC ? "rotate-180" : "rotate-0")}
            />
          </button>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

// TABLE BODY
type TransactionTableBodyProps = {
  sortedTransactions: ITransaction[];
  handleSelectedTransaction: (transaction: ITransaction) => void;
};

export const TransactionTableBody: React.FC<TransactionTableBodyProps> = ({
  sortedTransactions,
  handleSelectedTransaction,
}) => {
  return (
    <TableBody>
      {sortedTransactions.map((transaction, index) => (
        <TableRow key={index} className="cursor-pointer" onClick={() => handleSelectedTransaction(transaction)}>
          <TableCell>{transaction.label}</TableCell>
          <TableCell className="text-right">
            <FormattedTransaction amount={transaction.amount} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

// TABLE FOOTER
type TransactionTableFooterProps = {
  total: number;
};

export const TransactionTableFooter: React.FC<TransactionTableFooterProps> = ({ total }) => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={1}>Total</TableCell>
        <TableCell className="text-right">
          <FormattedTransaction amount={total} />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};
