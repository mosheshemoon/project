import axios, { AxiosResponse } from "axios";
import { User } from "../types";

const EMPLOYEE_API_BASE_URL = "http://localhost:80/user";

class UserService {
  static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  getUsers(): Promise<AxiosResponse<User[]>> {
    return axios.get<User[]>(EMPLOYEE_API_BASE_URL);
  }

  createUser(username: string, password: string): Promise<AxiosResponse<void>> {
    return axios.post<void>(EMPLOYEE_API_BASE_URL, { password, username });
  }

  updateUser(user: User, userId: string): Promise<AxiosResponse<User>> {
    return axios.put(`${EMPLOYEE_API_BASE_URL}/${userId}`, user);
  }

  deleteUser(itemId: string) {
    return axios.delete(`${EMPLOYEE_API_BASE_URL}/${itemId}`);
  }
}

export default UserService.getInstance();
