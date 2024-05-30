  import { IDepartment } from "../Department/Department";
  import { IWorkplace } from "../Workplace/Workplace";

  export interface IEmployee {
      _id: string;
      name: string;
      department: IDepartment;
      workplace: IWorkplace;
    }
    