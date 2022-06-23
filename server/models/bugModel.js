const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  steps: String,
  details: String,
  creator: String,
  name: String,
  assigned: {
    type: String,
    required: true,
  },
  devResponse: String,
  isResolved: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = Bug = mongoose.model("Bug", bugSchema);
