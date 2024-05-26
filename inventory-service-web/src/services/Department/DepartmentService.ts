import $auth from "../../api/auth";
import { IDepartment } from "./Department";

class DepartmentService {
  static async getDepartments() {
    return $auth.get<IDepartment[]>('/departments');
  }

  static async createDepartment(name: string) {
    return $auth.post<IDepartment>('/departments', { name });
  }

  static async updateDepartment(id: string, name: string) {
    return $auth.put<IDepartment>(`/departments/${id}`, { name });
  }

  static async deleteDepartment(id: string) {
    return $auth.delete(`/departments/${id}`);
  }
}

export default DepartmentService;
