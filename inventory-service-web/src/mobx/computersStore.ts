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
}
