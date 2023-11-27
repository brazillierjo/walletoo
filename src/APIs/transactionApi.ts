import { ApiRoute } from "@/src/enums/backend-routes";
import fetchAPI from "../utils/fetchAPI";

export class TransactionApi {
    static async post(data: { label: string; amount: number }, type: string) {
        return fetchAPI(`${ApiRoute.TRANSACTION}/${type}`, "POST", data);
    }

    static async delete(id: string, type: string) {
        return fetchAPI(`${ApiRoute.TRANSACTION}/${type}`, "DELETE", { id });
    }
}
