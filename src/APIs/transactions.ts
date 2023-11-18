import { ApiRoute } from "@/src/enums/backend-routes";

export class UserDataApi {
    static async get() {
        const response = await fetch(ApiRoute.USER_DATA);
        return response.json();
    }
}
