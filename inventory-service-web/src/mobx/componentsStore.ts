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
}
