import { makeAutoObservable } from "mobx";
import { IEmployee } from "../services/Employee/Employee";
import EmployeeService from "../services/Employee/EmployeeService";

export default class EmployeeStore {
    employees :IEmployee[] = []
    constructor(){
        makeAutoObservable(this);
    }
    setEmployees(employees: IEmployee[]) {
        this.employees = employees;
      }
    
      async fetchWorkplaces() {
        try {
          const response = await EmployeeService.getEmployees();
          this.setEmployees(response.data);
        } catch (error) {
          console.error("Failed to fetch workplaces", error);
        }
      }
}