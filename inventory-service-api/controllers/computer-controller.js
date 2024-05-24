const Computer = require("../models/computer-model");
const ApiError = require("../exceptions/api-error");
const PeripheralDevice = require("../models/peripheral-model");
const Component = require("../models/component-model");
const Workplace = require("../models/workplace-model");

class ComputerController {
  async create(req, res, next) {
    try {
      const { name, workplace, components, peripherals } = req.body;
      if (!name || !workplace) {
        throw ApiError.BadRequest(
          'Поля "Имя" и "Рабочее место" обязательны для заполнения'
        );
      }
      const computer = new Computer({
        name,
        workplace,
        components,
        peripherals,
      });
      await computer.save();
      return res.json(computer);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const computers = await Computer.find()
        .populate("workplace")
        .populate("components")
        .populate("peripherals");
      return res.json(computers);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const computer = await Computer.findById(id)
        .populate("workplace")
        .populate("components")
        .populate("peripherals");
      if (!computer) {
        throw ApiError.NotFound("Компьютер не найден");
      }
      return res.json(computer);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, workplace, components, peripherals } = req.body;
      const computer = await Computer.findByIdAndUpdate(
        id,
        { name, workplace, components, peripherals },
        { new: true }
      );
      if (!computer) {
        throw ApiError.NotFound("Компьютер не найден");
      }
      return res.json(computer);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const computer = await Computer.findByIdAndDelete(id);
      if (!computer) {
        throw ApiError.NotFound("Компьютер не найден");
      }
      return res.json({ message: "Компьютер успешно удален" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ComputerController();
