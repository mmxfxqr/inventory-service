import { IDepartment } from "../Department/Department";

export interface IWorkplace {
    _id: string;
    name: string;
    department: IDepartment;
  }