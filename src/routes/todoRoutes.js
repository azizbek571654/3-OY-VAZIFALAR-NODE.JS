import express from 'express';
import * as todoController from '../controller/todoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all todos for a specific chat ID
router.get('/:chatId', async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const todos = await todoController.getAllTodos(chatId);
    res.json({ success: true, data: todos });
  } catch (error) {
    next(error);
  }
});

// Get a specific todo by ID
router.get('/:chatId/:id', async (req, res, next) => {
  try {
    const { chatId, id } = req.params;
    const todo = await todoController.getTodoById(id, chatId);
    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
});

// Create a new todo
router.post('/:chatId', async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const newTodo = await todoController.createTodo(chatId, req.body);
    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    next(error);
  }
});

// Update a todo
router.put('/:chatId/:id', async (req, res, next) => {
  try {
    const { chatId, id } = req.params;
    const updatedTodo = await todoController.updateTodo(id, chatId, req.body);
    res.json({ success: true, data: updatedTodo });
  } catch (error) {
    next(error);
  }
});

// Delete a todo
router.delete('/:chatId/:id', async (req, res, next) => {
  try {
    const { chatId, id } = req.params;
    const deletedTodo = await todoController.deleteTodo(id, chatId);
    res.json({ success: true, data: deletedTodo });
  } catch (error) {
    next(error);
  }
});

// Toggle todo completion status
router.patch('/:chatId/:id/toggle', async (req, res, next) => {
  try {
    const { chatId, id } = req.params;
    const todo = await todoController.toggleTodoCompletion(id, chatId);
    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
});

export default router;
