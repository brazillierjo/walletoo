import { ApiRoute } from "@/src/enums/backend-routes";

export class IncomesApi {
    static async get() {
        const response = await fetch(ApiRoute.INCOMES);
        return response.json();
    }
}
