const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/taskControllers.js');
// Correctly import from middlewareControllers
const { verifyToken } = require('../controllers/middlewareControllers.js');

// Apply verifyToken middleware to all routes in this file
// Any request to /api/tasks will first be verified
router.use(verifyToken);

// GET /api/tasks - Get all tasks for the logged-in user
router.get('/', taskControllers.getAllTasks);

// POST /api/tasks - Create a new task for the logged-in user
router.post('/', taskControllers.createTask);

// PUT /api/tasks/:id - Update a specific task
router.put('/:id', taskControllers.updateTask);

// DELETE /api/tasks/:id - Delete a specific task
router.delete('/:id', taskControllers.deleteTask);

module.exports = router;