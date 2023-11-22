import { ApiRoute } from "@/src/enums/backend-routes";
import { Route } from "@/src/enums/frontend-routes";
import { signOut } from "next-auth/react";

export class UserApi {
    static async get() {
        const response = await fetch(ApiRoute.USER);

        if (response.status >= 500 && response.status < 600) {
            signOut({ callbackUrl: Route.SIGNIN });
        }

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
