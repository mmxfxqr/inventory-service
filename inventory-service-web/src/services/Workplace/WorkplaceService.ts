import $auth from "../../api/auth";
import { IWorkplace } from "./Workplace";

class WorkplaceService {
  static async getWorkplaces() {
    return $auth.get<IWorkplace[]>('/workplaces');
  }

  static async createWorkplace(name: string, departmentId: string) {
    return $auth.post<IWorkplace>('/workplaces', { name, department: departmentId });
  }

  static async updateWorkplace(id: string, name: string, departmentId: string) {
    return $auth.put<IWorkplace>(`/workplaces/${id}`, { name, department: departmentId });
  }

  static async deleteWorkplace(id: string) {
    return $auth.delete(`/workplaces/${id}`);
  }
}

export default WorkplaceService;
