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

  async createDepartment(name: string) {
    try {
      const response = await DepartmentService.createDepartment(name);
      this.departments.push(response.data);
    } catch (error) {
      console.error("Failed to create department", error);
    }
  }

  async updateDepartment(id: string, name: string) {
    try {
      const response = await DepartmentService.updateDepartment(id, name);
      const index = this.departments.findIndex(dep => dep._id === id);
      if (index !== -1) {
        this.departments[index] = response.data;
      }
    } catch (error) {
      console.error("Failed to update department", error);
    }
  }

  async deleteDepartment(id: string) {
    try {
      await DepartmentService.deleteDepartment(id);
      this.departments = this.departments.filter(dep => dep._id !== id);
    } catch (error) {
      console.error("Failed to delete department", error);
    }
  }
}
