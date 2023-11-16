import { ApiRoute } from "@/src/enums/backend-routes";

export class IncomesApi {
    static async get() {
        const response = await fetch(ApiRoute.INCOMES);
        return response.json();
    }
}

export class ExpensesApi {
    static async get() {
        const response = await fetch(ApiRoute.EXPENSES);
        return response.json();
    }
}
