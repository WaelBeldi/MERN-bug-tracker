const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
  title: String,
  version: String,
  priority: String,
  steps: String,
  details: String,
  creator: String,
  name: String,
  assigned: String,
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
