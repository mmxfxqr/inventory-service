import $auth from "../../api/auth";
import { IEmployee } from "./Employee";

class EmployeeService {
  static async getEmployees() {
    return $auth.get<IEmployee[]>('/employees');
  }
}

export default EmployeeService;
