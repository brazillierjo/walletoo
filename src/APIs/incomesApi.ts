import { ApiRoute } from "@/src/enums/backend-routes";

export class IncomesApi {
    static async post(data: { label: string; amount: number }) {
        const response = await fetch(ApiRoute.INCOMES, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const responseBody = await response.text();
        return responseBody ? JSON.parse(responseBody) : {};
    }
}
