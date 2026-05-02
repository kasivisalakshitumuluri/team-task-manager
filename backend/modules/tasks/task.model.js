const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

   
    status: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      default: "todo"
    },

   
    assignedTo: {
      type: String, // email or username
      default: "unassigned"
    },

    project: {
      type: String,
      default: "General"
    },

  
    dueDate: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);