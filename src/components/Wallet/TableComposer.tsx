import { panelAtom } from "@/src/atoms/panel.atom";
import { selectedOperationAtom } from "@/src/atoms/selectedOperation.atom";
import FormattedOperation from "@/src/components/Commons/FormattedOperation";
import { TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { OperationFilter } from "@/src/enums/operationFilter";
import { OperationTypeLabel } from "@/src/enums/operationType";
import { IOperation } from "@/src/interfaces/operationInterface";
import { cn } from "@/src/utils/tailwindMerge";
import { useAtom } from "jotai";
import { IoChevronDownOutline } from "react-icons/io5";

// TABLE HEADER
type OperationTableHeaderProps = {
  toggleLabelSort: () => void;
  toggleAmountSort: () => void;
  sortType: OperationFilter;
};

export const OperationTableHeader: React.FC<OperationTableHeaderProps> = ({
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
              className={cn("ml-1 h-3 w-3", sortType === OperationFilter.LabelASC ? "rotate-180" : "rotate-0")}
            />
          </button>
        </TableHead>
        <TableHead className="pb-1 text-right text-sm uppercase">
          Montant
          <button onClick={toggleAmountSort}>
            <IoChevronDownOutline
              className={cn("ml-1 h-3 w-3", sortType === OperationFilter.AmountASC ? "rotate-180" : "rotate-0")}
            />
          </button>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

// TABLE BODY
type OperationTableBodyProps = {
  type: OperationTypeLabel;
  sortedOperations: IOperation[];
};

export const OperationTableBody: React.FC<OperationTableBodyProps> = ({ type, sortedOperations }) => {
  const [, setSelectedOperation] = useAtom(selectedOperationAtom);
  const [, setShowPanel] = useAtom(panelAtom);

  const handleSelectedOperation = (operation: IOperation) => {
    setSelectedOperation({ type, operation });
    setShowPanel(true);
  };

  return (
    <TableBody>
      {sortedOperations.map((operation) => (
        <TableRow key={operation._id} className="cursor-pointer" onClick={() => handleSelectedOperation(operation)}>
          <TableCell>{operation.label}</TableCell>
          <TableCell className="text-right">
            <FormattedOperation amount={operation.amount} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

// TABLE FOOTER
type OperationTableFooterProps = {
  total: number;
};

export const OperationTableFooter: React.FC<OperationTableFooterProps> = ({ total }) => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={1}>Total</TableCell>
        <TableCell className="text-right">
          <FormattedOperation amount={total} />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};
