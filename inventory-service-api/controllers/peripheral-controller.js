const Peripheral = require("../models/peripheral-model");
const ApiError = require("../exceptions/api-error");

class PeripheralController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        throw ApiError.BadRequest('Поле "Имя" обязательно для заполнения');
      }
      const peripheral = new Peripheral({ name });
      await peripheral.save();
      return res.json(peripheral);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const peripherals = await Peripheral.find();
      return res.json(peripherals);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const peripheral = await Peripheral.findById(id);
      if (!peripheral) {
        throw ApiError.NotFound("Периферийное устройство не найдено");
      }
      return res.json(peripheral);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const peripheral = await Peripheral.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      if (!peripheral) {
        throw ApiError.NotFound("Периферийное устройство не найдено");
      }
      return res.json(peripheral);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const peripheral = await Peripheral.findByIdAndDelete(id);
      if (!peripheral) {
        throw ApiError.NotFound("Периферийное устройство не найдено");
      }
      return res.json({ message: "Периферийное устройство успешно удалено" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PeripheralController();
