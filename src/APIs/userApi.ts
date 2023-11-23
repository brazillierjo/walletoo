import { ApiRoute } from "@/src/enums/backend-routes";
import { PartialUserUpdate } from "@/src/mongoDB/userSchema";

export class UserApi {
    static async get() {
        const response = await fetch(ApiRoute.USER, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP, statut = ${response.status}`);
        }

        return response.json();
    }

    static async patch(data: PartialUserUpdate) {
        const response = await fetch(ApiRoute.USER, {
            method: "PATCH",
            body: JSON.stringify(data),
        });

        return response.json();
    }

    static async delete() {
        const response = await fetch(ApiRoute.USER, {
            method: "DELETE",
        });

        return response.json();
    }
}
