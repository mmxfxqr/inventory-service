import { IComponent } from "../Component/Component";
import { IPeripheral } from "../Peripheral/Peripheral";
import { IWorkplace } from "../Workplace/Workplace";

export interface IComputer {
    _id: string;
    name: string;
    components: IComponent[];
    peripherals: IPeripheral[];
    workplace: IWorkplace;
  }
  