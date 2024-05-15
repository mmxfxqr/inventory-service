const { Schema, model } = require("mongoose");

const PeripheralDeviceSchema = new Schema({
  name: { type: String,unique: true, required: true },
  type: { type: String, required: true }, // Мышь, монитор, клавиатура и т.д.
});

module.exports = model("PeripheralDevice", PeripheralDeviceSchema);
