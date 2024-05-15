const { Schema, model } = require("mongoose");

const ComponentSchema = new Schema({
  name: { type: String,unique: true, required: true },
  type: { type: String, required: true }, // Процессор, память, HDD и т.д.
});

module.exports = model("Component", ComponentSchema);
