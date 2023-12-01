import { OperationTypeLabel } from "@/src/enums/operationType";
import { IOperation } from "@/src/interfaces/operationInterface";

export type SelectedOperationAtom = {
  type: OperationTypeLabel;
  operation: IOperation;
};
