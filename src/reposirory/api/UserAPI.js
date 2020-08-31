import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_THE_SHOW_USER_API_URL
});

instance.defaults.headers.post["Content-Type"] =
  "application/json; charset=utf-8";

class UserAPI {
  static async registerUserProfile(profile){
    await instance.post("/user",profile)
  }
  static async getUserProfileList(query,limit,LastEvaluatedKey) {
    // TODO: query and pagination
    return (await instance.get("/user")).data;
  }
  static async getUserProfile(userId) {
    return (await  instance.get(`/user/${userId}`)).data
  }
}

export default UserAPI;
