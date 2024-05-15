const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema({
  name: { type: String, unique: true, required: true },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  workplace: { type: Schema.Types.ObjectId, ref: "Workplace" },
});

module.exports = model("Employee", EmployeeSchema);
