import { ApiRoute } from "@/src/enums/backend-routes";

export class UserApi {
    static async get() {
        const response = await fetch(ApiRoute.USER);

        return response.json();
    }

    static async patch(data: unknown) {
        const response = await fetch(ApiRoute.USER, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
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
