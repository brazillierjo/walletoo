import { ApiRoute } from "@/src/enums/backendRoutes";
import { IOperation } from "@/src/interfaces/operationInterface";
import fetchAPI from "@/src/utils/fetchAPI";

export class OperationApi {
  static async post(data: Omit<IOperation, "_id">, type: string) {
    return fetchAPI(`${ApiRoute.OPERATION}/${type}`, "POST", data);
  }

  static async put(
    data: Required<Pick<IOperation, "_id" | "label" | "amount">> & Partial<Pick<IOperation, "category">>,
    type: string
  ) {
    return fetchAPI(`${ApiRoute.OPERATION}/${type}`, "PUT", data);
  }

  static async delete(_id: string, type: string) {
    return fetchAPI(`${ApiRoute.OPERATION}/${type}`, "DELETE", { _id });
  }
}
