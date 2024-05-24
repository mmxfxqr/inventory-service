import $auth from "../../api/auth";
import { IComponent } from "./Component";

class ComponentService {
  static async getComponents() {
    return $auth.get<IComponent[]>('/components');
  }
}

export default ComponentService;
