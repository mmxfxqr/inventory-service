import $auth from "../../api/auth";
import { IPeripheral } from "./Peripheral";


class PeripheralService {
  static async getPeripherals() {
    return $auth.get<IPeripheral[]>('/peripherals');
  }
}

export default PeripheralService;
