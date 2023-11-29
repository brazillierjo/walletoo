import { DynamicUrlParams } from "@/src/enums/dynamicUrlParams"

export function requestCheck(req: Request, type: string) {
  if (type !== DynamicUrlParams.INCOMES && type !== DynamicUrlParams.EXPENSES) {
    throw new Error("Invalid type")
  }

  if (!req.body) {
    throw new Error("No body provided")
  }
}
