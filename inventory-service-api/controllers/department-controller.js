const Department = require('../models/department-model');
const ApiError = require('../exceptions/api-error');

class DepartmentController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        throw ApiError.BadRequest('Поле "Имя" обязательно для заполнения');
      }
      const department = new Department({ name });
      await department.save();
      return res.json(department);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const departments = await Department.find();
      return res.json(departments);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const department = await Department.findById(id);
      if (!department) {
        throw ApiError.BadRequest('Отдел не найден');
      }
      return res.json(department);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const department = await Department.findByIdAndUpdate(id, { name }, { new: true });
      if (!department) {
        throw ApiError.BadRequest('Отдел не найден');
      }
      return res.json(department);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const department = await Department.findByIdAndDelete(id);
      if (!department) {
        throw ApiError.BadRequest('Отдел не найден');
      }
      return res.json({ message: 'Отдел успешно удален' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DepartmentController();
