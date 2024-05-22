import $auth from "../../api/auth";
import { IDepartment } from "./Department";

class DepartmentService {
  static async getDepartments() {
    return $auth.get<IDepartment[]>('/departments');
  }
}

export default DepartmentService;
