import $auth from "../../api/auth";
import { IComponent } from "./Component";

class ComponentService {
  static async getComponents() {
    return $auth.get<IComponent[]>('/components');
  }

  static async createComponent(data: { name: string, type: string }) {
    return $auth.post<IComponent>('/components', data);
  }

  static async updateComponent(id: string, data: { name: string, type: string }) {
    return $auth.put<IComponent>(`/components/${id}`, data);
  }

  static async deleteComponent(id: string) {
    return $auth.delete(`/components/${id}`);
  }
}

export default ComponentService;
