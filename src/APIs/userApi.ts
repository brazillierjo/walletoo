import { ApiRoute } from "@/src/enums/backend-routes";
import { PartialUserUpdate } from "@/src/mongoDB/userSchema";
import fetchAPI from "../utils/fetchAPI";
import { IUser } from "../interfaces/userInterface";

export class UserApi {
    static async get() {
        return fetchAPI<IUser>(ApiRoute.USER, "GET");
    }

    static async patch(data: PartialUserUpdate) {
        return fetchAPI<IUser>(ApiRoute.USER, "PATCH", data);
    }

    static async delete() {
        return fetchAPI(ApiRoute.USER, "DELETE");
    }
}
