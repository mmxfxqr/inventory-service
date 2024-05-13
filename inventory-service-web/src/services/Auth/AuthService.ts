import { AxiosResponse } from "axios";
import $auth from "../../api/auth";
import { AuthResponse } from "./AuthResponse";
import { IUser } from "./User";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $auth.post<AuthResponse>('/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $auth.post<AuthResponse>('/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return $auth.post('/logout')
    }
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $auth.get<IUser[]>('/users')
    }
}
