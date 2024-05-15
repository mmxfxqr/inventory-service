const { Schema, model } = require("mongoose");

const WorkplaceSchema = new Schema({
  name: { type: String,unique: true, required: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  employee: { type: Schema.Types.ObjectId, ref: 'Employee' }
});

module.exports = model('Workplace', WorkplaceSchema);
