import $auth from "../../api/auth";
import { IEmployee } from "./Employee";

class EmployeeService {
  static async getEmployees() {
    return $auth.get<IEmployee[]>('/employees');
  }

  static async createEmployee(name: string, departmentId: string, workplaceId: string) {
    return $auth.post<IEmployee>('/employees', { name, department: departmentId, workplace: workplaceId });
  }

  static async updateEmployee(id: string, name: string, departmentId: string, workplaceId: string) {
    return $auth.put<IEmployee>(`/employees/${id}`, { name, department: departmentId, workplace: workplaceId });
  }

  static async deleteEmployee(id: string) {
    return $auth.delete(`/employees/${id}`);
  }
}

export default EmployeeService;
