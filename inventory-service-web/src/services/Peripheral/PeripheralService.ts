import $auth from "../../api/auth";
import { IPeripheral } from "./Peripheral";

class PeripheralService {
  static async getPeripherals() {
    return $auth.get<IPeripheral[]>('/peripherals');
  }

  static async createPeripheral(data: { name: string, type: string }) {
    return $auth.post<IPeripheral>('/peripherals', data);
  }

  static async updatePeripheral(id: string, data: { name: string, type: string }) {
    return $auth.put<IPeripheral>(`/peripherals/${id}`, data);
  }

  static async deletePeripheral(id: string) {
    return $auth.delete(`/peripherals/${id}`);
  }
}

export default PeripheralService;
