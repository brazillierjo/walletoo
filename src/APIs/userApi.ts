import { ApiRoute } from "@/src/enums/backend-routes";
import { PartialUserUpdate } from "@/src/mongoDB/userSchema";
import fetchAPI from "../utils/fetchAPI";
import { IUser } from "../interfaces/userInterface";
import { resetData } from "@/src/utils/resetData";

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

    static async resetUserData() {
        return fetchAPI<IUser>(ApiRoute.USER, "PATCH", resetData);
    }
}
