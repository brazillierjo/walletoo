import { OperationType } from "@/src/enums/operationType";
import { IOperation } from "@/src/interfaces/operationInterface";

export type SelectedOperationAtom = {
  type: OperationType;
  operation: IOperation;
};
