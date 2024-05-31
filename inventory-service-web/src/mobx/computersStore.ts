import { makeAutoObservable } from "mobx";
import { IComputer } from "../services/Computers/Computer";
import ComputerService from "../services/Computers/ComputersService";

export default class ComputersStore {
  computers: IComputer[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setComputers(computers: IComputer[]) {
    this.computers = computers;
  }

  async fetchComputers() {
    try {
      const response = await ComputerService.getComputers();
      this.setComputers(response.data);
    } catch (error) {
      console.error("Failed to fetch computers", error);
    }
  }

  async createComputer(computer: Partial<IComputer>) {
    try {
      const response = await ComputerService.createComputer(computer);
      this.setComputers([...this.computers, response.data]);
    } catch (error) {
      console.error("Failed to create computer", error);
    }
  }

  async updateComputer(id: string, computer: Partial<IComputer>) {
    try {
      const response = await ComputerService.updateComputer(id, computer);
      this.setComputers(this.computers.map(comp => comp._id === id ? response.data : comp));
    } catch (error) {
      console.error("Failed to update computer", error);
    }
  }

  async deleteComputer(id: string) {
    try {
      await ComputerService.deleteComputer(id);
      this.setComputers(this.computers.filter(comp => comp._id !== id));
    } catch (error) {
      console.error("Failed to delete computer", error);
    }
  }
}
