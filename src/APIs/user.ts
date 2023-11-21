import { ApiRoute } from "@/src/enums/backend-routes";
import { IUserSchema } from "@/src/mongoDB/userSchema";

export class UserApi {
    static async get() {
        const response = await fetch(ApiRoute.USER);

        return response.json();
    }

    static async update(data: IUserSchema) {
        const response = await fetch(ApiRoute.USER, {
            method: "PUT",
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
