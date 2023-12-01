import { OperationType } from "@/src/enums/operationType";

export function requestCheck(req: Request, type: string) {
  if (type !== OperationType.INCOMES && type !== OperationType.EXPENSES) {
    throw new Error("Invalid type");
  }

  if (!req.body) {
    throw new Error("No body provided");
  }
}
