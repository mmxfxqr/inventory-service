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
      console.error("Failed to fetch peripheral", error);
    }
  }
}
