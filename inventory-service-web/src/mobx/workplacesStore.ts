import { makeAutoObservable } from "mobx";
import { IWorkplace } from "../services/Workplace/Workplace";
import WorkplaceService from "../services/Workplace/WorkplaceService";

export default class WorkplacesStore {
  workplaces: IWorkplace[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  setWorkplaces(workplaces: IWorkplace[]) {
    this.workplaces = workplaces;
  }

  async fetchWorkplaces() {
    try {
      const response = await WorkplaceService.getWorkplaces();
      this.setWorkplaces(response.data);
    } catch (error) {
      console.error("Failed to fetch workplaces", error);
    }
  }
}
