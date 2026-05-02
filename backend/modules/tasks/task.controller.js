const Task = require("./task.model");

// CREATE
async function createTask(req, res) {
  try {
    const { title, description, status, assignedTo, project, dueDate } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title required" });
    }

    const task = await Task.create({
      title: title.trim(),
      description,
      status,
      assignedTo,
      project,
      dueDate
    });

    return res.status(201).json({ data: task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create failed" });
  }
}

// GET
async function getTasks(req, res) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ data: tasks });
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
}

// UPDATE (status / assignment / project)
async function updateTask(req, res) {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ data: updated });
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
}

// DELETE
async function deleteTask(req, res) {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
}

module.exports = { createTask, getTasks, updateTask, deleteTask };