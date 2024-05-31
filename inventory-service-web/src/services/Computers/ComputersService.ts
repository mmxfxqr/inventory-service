import $auth from "../../api/auth";
import { IComputer } from "./Computer";

class ComputerService {
  static async getComputers() {
    return $auth.get<IComputer[]>('/computers');
  }

  static async createComputer(computer: Partial<IComputer>) {
    return $auth.post<IComputer>('/computers', computer);
  }

  static async updateComputer(id: string, computer: Partial<IComputer>) {
    return $auth.put<IComputer>(`/computers/${id}`, computer);
  }

  static async deleteComputer(id: string) {
    return $auth.delete(`/computers/${id}`);
  }
}

export default ComputerService;
