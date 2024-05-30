import { makeAutoObservable, runInAction } from "mobx";
import { IEmployee } from "../services/Employee/Employee";
import EmployeeService from "../services/Employee/EmployeeService";

export default class EmployeeStore {
  employees: IEmployee[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setEmployees(employees: IEmployee[]) {
    this.employees = employees;
  }

  async fetchEmployees() {
    try {
      const response = await EmployeeService.getEmployees();
      runInAction(() => {
        this.setEmployees(response.data);
      });
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  }

  async createEmployee(name: string, departmentId: string, workplaceId: string) {
    try {
      const response = await EmployeeService.createEmployee(name, departmentId, workplaceId);
      runInAction(() => {
        this.employees.push(response.data);
      });
    } catch (error) {
      console.error("Failed to create employee", error);
    }
  }

  async updateEmployee(id: string, name: string, departmentId: string, workplaceId: string) {
    try {
      const response = await EmployeeService.updateEmployee(id, name, departmentId, workplaceId);
      runInAction(() => {
        const index = this.employees.findIndex(employee => employee._id === id);
        if (index !== -1) {
          this.employees[index] = response.data;
        }
      });
    } catch (error) {
      console.error("Failed to update employee", error);
    }
  }

  async deleteEmployee(id: string) {
    try {
      await EmployeeService.deleteEmployee(id);
      runInAction(() => {
        this.employees = this.employees.filter(employee => employee._id !== id);
      });
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  }
}
