import { ApiRoute } from "@/src/enums/backend-routes"
import { PartialUserUpdate } from "@/src/mongoDB/userSchema"
import { resetData } from "@/src/utils/resetData"

import { IUser } from "../interfaces/userInterface"
import fetchAPI from "../utils/fetchAPI"

export class UserApi {
  static async get() {
    return fetchAPI<IUser>(ApiRoute.USER, "GET")
  }

  static async patch(data: PartialUserUpdate) {
    return fetchAPI<IUser>(ApiRoute.USER, "PATCH", data)
  }

  static async delete() {
    return fetchAPI(ApiRoute.USER, "DELETE")
  }

  static async resetUserData() {
    return fetchAPI<IUser>(ApiRoute.USER, "PATCH", resetData)
  }
}
