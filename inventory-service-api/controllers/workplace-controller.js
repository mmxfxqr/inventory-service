const Workplace = require("../models/workplace-model");
const ApiError = require("../exceptions/api-error");

class WorkplaceController {
  async create(req, res, next) {
    try {
      const { name, department, employee } = req.body;
      if (!name || !department) {
        throw ApiError.BadRequest('Поле "Имя" и "Отдел" обязательны для заполнения');
      }
      const workplace = new Workplace({ name, department, employee });
      await workplace.save();
      return res.json(workplace);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const workplaces = await Workplace.find().populate('department').populate('employee');
      return res.json(workplaces);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const workplace = await Workplace.findById(id).populate('department').populate('employee');
      if (!workplace) {
        throw ApiError.BadRequest('Рабочее место не найдено');
      }
      return res.json(workplace);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, department, employee } = req.body;
      const workplace = await Workplace.findByIdAndUpdate(id, { name, department, employee }, { new: true });
      if (!workplace) {
        throw ApiError.BadRequest('Рабочее место не найдено');
      }
      return res.json(workplace);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const workplace = await Workplace.findByIdAndDelete(id);
      if (!workplace) {
        throw ApiError.BadRequest('Рабочее место не найдено');
      }
      return res.json({ message: 'Рабочее место успешно удалено' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new WorkplaceController();
