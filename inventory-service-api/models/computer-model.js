const { Schema, model } = require("mongoose");

const ComputerSchema = new Schema({
  name: { type: String, unique: true,required: true },
  components: [{ type: Schema.Types.ObjectId, ref: "Component" }],
  peripherals: [{ type: Schema.Types.ObjectId, ref: "Peripheral" }],
  workplace: { type: Schema.Types.ObjectId, ref: "Workplace", required: true },
});

module.exports = model("Computer", ComputerSchema);
