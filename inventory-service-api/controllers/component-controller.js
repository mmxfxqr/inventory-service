const Component = require("../models/component-model");
const ApiError = require("../exceptions/api-error");

class ComponentController {
  async create(req, res, next) {
    try {
      const { name, type } = req.body;
      if (!name || !type) {
        throw ApiError.BadRequest(
          'Поля "Имя" и "Тип" обязательны для заполнения'
        );
      }
      const component = new Component({ name, type });
      await component.save();
      return res.json(component);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const components = await Component.find();
      return res.json(components);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const component = await Component.findById(id);
      if (!component) {
        throw ApiError.NotFound("Комплектующее не найдено");
      }
      return res.json(component);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, type } = req.body;
      const component = await Component.findByIdAndUpdate(
        id,
        { name, type },
        { new: true }
      );
      if (!component) {
        throw ApiError.NotFound("Комплектующее не найдено");
      }
      return res.json(component);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const component = await Component.findByIdAndDelete(id);
      if (!component) {
        throw ApiError.NotFound("Комплектующее не найдено");
      }
      return res.json({ message: "Комплектующее успешно удалено" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ComponentController();
