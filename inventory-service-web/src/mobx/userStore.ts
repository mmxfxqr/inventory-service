import { API_URL } from "./../api/auth";
import { makeAutoObservable } from "mobx";
import { IUser } from "../services/Auth/User";
import AuthService from "../services/Auth/AuthService";
import axios from "axios";
import { AuthResponse } from "../services/Auth/AuthResponse";
import { useNavigate } from "react-router-dom";

export default class UserStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setUser(user: IUser) {
    this.user = user;
  }
  setLoading(bool: boolean) {
    this.isLoading = bool;
  }
  setError(string: string) {
    this.error = string;
  }
  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setError("");
    } catch (e) {
      console.log(e.response?.data?.message);
      this.setError(e.response?.data?.message);
    }
  }
  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setError("");
    } catch (e) {
      this.setAuth(false);
      console.log(e.response?.data?.message);
      this.setError(e.response?.data?.message);
    }
  }

  async logout(navigate: any) {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
      this.setError("");
      navigate('/');
    } catch (e) {
      console.log(e.response?.data?.message);
      this.setError(e.response?.data?.message);
    }
  }
  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setError("");
    } catch (e) {
      console.log(e.response?.data?.message);
      this.setError(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
