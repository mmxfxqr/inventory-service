import { makeAutoObservable, runInAction } from "mobx";
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
      runInAction(() => {
        this.setWorkplaces(response.data);
      });
    } catch (error) {
      console.error("Failed to fetch workplaces", error);
    }
  }

  async createWorkplace(name: string, departmentId: string) {
    try {
      const response = await WorkplaceService.createWorkplace(name, departmentId);
      runInAction(() => {
        this.workplaces.push(response.data);
      });
    } catch (error) {
      console.error("Failed to create workplace", error);
    }
  }

  async updateWorkplace(id: string, name: string, departmentId: string) {
    try {
      const response = await WorkplaceService.updateWorkplace(id, name, departmentId);
      runInAction(() => {
        const index = this.workplaces.findIndex(workplace => workplace._id === id);
        if (index !== -1) {
          this.workplaces[index] = response.data;
        }
      });
    } catch (error) {
      console.error("Failed to update workplace", error);
    }
  }

  async deleteWorkplace(id: string) {
    try {
      await WorkplaceService.deleteWorkplace(id);
      runInAction(() => {
        this.workplaces = this.workplaces.filter(workplace => workplace._id !== id);
      });
    } catch (error) {
      console.error("Failed to delete workplace", error);
    }
  }
}
