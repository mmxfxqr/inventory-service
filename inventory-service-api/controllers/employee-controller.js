const Employee = require("../models/employee-model");
const ApiError = require("../exceptions/api-error");

class EmployeeController {
  async create(req, res, next) {
    try {
      const { name, department, workplace } = req.body;
      if (!name || !department) {
        throw ApiError.BadRequest(
          'Поле "Имя" и "Отдел" обязательны для заполнения'
        );
      }
      const employee = new Employee({ name, department, workplace });
      await employee.save()
      return res.json(employee);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const employees = await Employee.find()
        .populate("department")
        .populate("workplace");
      return res.json(employees);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const employee = await Employee.findById(id)
        .populate("department")
        .populate("workplace");
      if (!employee) {
        throw ApiError.BadRequest("Сотрудник не найден");
      }
      return res.json(employee);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, department, workplace } = req.body;
      const employee = await Employee.findByIdAndUpdate(
        id,
        { name, department, workplace },
        { new: true }
      );
      if (!employee) {
        throw ApiError.BadRequest("Сотрудник не найден");
      }
      return res.json(employee);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) {
        throw ApiError.BadRequest("Сотрудник не найден");
      }
      return res.json({ message: "Сотрудник успешно удален" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new EmployeeController();
