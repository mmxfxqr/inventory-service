import { makeAutoObservable } from "mobx";
import { IComponent } from "../services/Component/Component";
import ComponentService from "../services/Component/ComponentService";

export default class ComponentsStore {
  components: IComponent[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setComponents(components: IComponent[]) {
    this.components = components;
  }

  async fetchComponents() {
    try {
      const response = await ComponentService.getComponents();
      this.setComponents(response.data);
    } catch (error) {
      console.error("Failed to fetch components", error);
    }
  }

  async createComponent(name: string, type: string) {
    try {
      const response = await ComponentService.createComponent({ name, type });
      this.components.push(response.data);
    } catch (error) {
      console.error("Failed to create component", error);
    }
  }

  async updateComponent(id: string, name: string, type: string) {
    try {
      const response = await ComponentService.updateComponent(id, {
        name,
        type,
      });
      this.components = this.components.map((component) =>
        component._id === id ? response.data : component
      );
    } catch (error) {
      console.error("Failed to update component", error);
    }
  }

  async deleteComponent(id: string) {
    try {
      await ComponentService.deleteComponent(id);
      this.components = this.components.filter(
        (component) => component._id !== id
      );
    } catch (error) {
      console.error("Failed to delete component", error);
    }
  }
}
