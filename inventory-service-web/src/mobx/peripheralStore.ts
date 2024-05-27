import { makeAutoObservable } from "mobx";
import { IPeripheral } from "../services/Peripheral/Peripheral";
import PeripheralService from "../services/Peripheral/PeripheralService";

export default class PeripheralStore {
  peripherals: IPeripheral[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setPeripherals(peripherals: IPeripheral[]) {
    this.peripherals = peripherals;
  }

  async fetchPeripherals() {
    try {
      const response = await PeripheralService.getPeripherals();
      this.setPeripherals(response.data);
    } catch (error) {
      console.error("Failed to fetch peripherals", error);
    }
  }

  async createPeripheral(name: string, type: string) {
    try {
      const response = await PeripheralService.createPeripheral({ name, type });
      this.peripherals.push(response.data);
    } catch (error) {
      console.error("Failed to create peripheral", error);
    }
  }

  async updatePeripheral(id: string, name: string, type: string) {
    try {
      const response = await PeripheralService.updatePeripheral(id, { name, type });
      this.peripherals = this.peripherals.map((p) => (p._id === id ? response.data : p));
    } catch (error) {
      console.error("Failed to update peripheral", error);
    }
  }

  async deletePeripheral(id: string) {
    try {
      await PeripheralService.deletePeripheral(id);
      this.peripherals = this.peripherals.filter((p) => p._id !== id);
    } catch (error) {
      console.error("Failed to delete peripheral", error);
    }
  }
}
