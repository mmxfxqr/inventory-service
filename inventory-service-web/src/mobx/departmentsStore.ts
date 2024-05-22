import { makeAutoObservable } from "mobx";
import { IDepartment } from "../services/Department/Department";
import DepartmentService from "../services/Department/DepartmentService";

export default class DepartmentsStore {
  departments: IDepartment[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setDepartments(departments: IDepartment[]) {
    this.departments = departments;
  }

  async fetchDepartments() {
    try {
      const response = await DepartmentService.getDepartments();
      this.setDepartments(response.data);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  }
}
