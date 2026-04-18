const Task = require('../models/Task.js');

// CREATE A NEW TASK
const createTask = async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Request User:', req.user);
  try {
    const { title, description, deadline, status } = req.body;
    const newTask = new Task({
      userId: req.user.id, // Assuming user ID is attached to the request
      title,
      description,
      deadline,
      status,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL TASKS FOR A USER
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE A TASK
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE A TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTask, getAllTasks, updateTask, deleteTask };
