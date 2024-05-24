const PeripheralDevice = require("../models/peripheral-model");
const ApiError = require("../exceptions/api-error");

class PeripheralController {
  async create(req, res, next) {
    try {
      const { name, type } = req.body;
      if (!name || !type) {
        throw ApiError.BadRequest(
          'Поля "Имя" и "Тип" обязательны для заполнения'
        );
      }
      const peripheral = new PeripheralDevice({ name, type });
      await peripheral.save();
      return res.json(peripheral);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, type } = req.body;
      const peripheral = await PeripheralDevice.findByIdAndUpdate(
        id,
        { name, type },
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

  async getAll(req, res, next) {
    try {
      const peripherals = await PeripheralDevice.find();
      return res.json(peripherals);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const peripheral = await PeripheralDevice.findById(id);
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
      const peripheral = await PeripheralDevice.findByIdAndDelete(id);
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
