import { ApiRoute } from "@/src/enums/backend-routes";

export class UserApi {
    static async get() {
        const response = await fetch(ApiRoute.USER);

        return response.json();
    }

    static async delete() {
        const response = await fetch(ApiRoute.USER_DELETE, {
            method: "DELETE",
        });

        return response.json();
    }
}
