import { ApiRoute } from "@/src/enums/backendRoutes";
import { ITransaction } from "@/src/interfaces/transactionInterface";
import fetchAPI from "@/src/utils/fetchAPI";

export class TransactionApi {
  static async post(data: Omit<ITransaction, "_id">, type: string) {
    return fetchAPI(`${ApiRoute.TRANSACTION}/${type}`, "POST", data);
  }

  static async put(
    data: Required<Pick<ITransaction, "_id" | "label" | "amount">> & Partial<Pick<ITransaction, "category">>,
    type: string
  ) {
    return fetchAPI(`${ApiRoute.TRANSACTION}/${type}`, "PUT", data);
  }

  static async delete(_id: string, type: string) {
    return fetchAPI(`${ApiRoute.TRANSACTION}/${type}`, "DELETE", { _id });
  }
}
