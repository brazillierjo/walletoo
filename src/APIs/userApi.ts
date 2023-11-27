import { ApiRoute } from "@/src/enums/backend-routes";
import { PartialUserUpdate } from "@/src/mongoDB/userSchema";
import fetchAPI from "../utils/fetchAPI";

export class UserApi {
    static async get() {
        return fetchAPI(ApiRoute.USER, "GET");
    }

    static async patch(data: PartialUserUpdate) {
        return fetchAPI(ApiRoute.USER, "PATCH", data);
    }

    static async delete() {
        return fetchAPI(ApiRoute.USER, "DELETE");
    }
}
