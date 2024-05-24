import $auth from "../../api/auth";
import { IComputer } from "./Computer";

class ComputerService {
  static async getComputers() {
    return $auth.get<IComputer[]>('/computers');
  }
}

export default ComputerService;
