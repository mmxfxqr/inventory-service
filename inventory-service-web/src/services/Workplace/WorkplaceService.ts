import $auth from "../../api/auth";
import { IWorkplace } from "./Workplace";

class WorkplaceService {
  static async getWorkplaces() {
    return $auth.get<IWorkplace[]>('/workplaces');
  }
}

export default WorkplaceService;
