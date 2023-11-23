import { ApiRoute } from "@/src/enums/backend-routes";

export class TransactionApi {
    static async post(data: { label: string; amount: number }, type: string) {
        const response = await fetch(`${ApiRoute.TRANSACTION}/${type}`, {
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
