import { ApiRoute } from "@/src/enums/backendRoutes";
import { IUser } from "@/src/interfaces/userInterface";
import { PartialUserUpdate } from "@/src/mongoDB/userSchema";
import fetchAPI from "@/src/utils/fetchAPI";
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
