import Todo from '../db/models/Todo.js';

// Create a new todo
export const createTodo = async (chatId, todoData) => {
  try {
    const newTodo = await Todo.create({
      ...todoData,
      telegramChatId: chatId
    });
    return newTodo;
  } catch (error) {
    throw new Error(`Failed to create todo: ${error.message}`);
  }
};

// Get all todos for a specific chat
export const getAllTodos = async (chatId) => {
  try {
    const todos = await Todo.find({ telegramChatId: chatId }).sort({ createdAt: -1 });
    return todos;
  } catch (error) {
    throw new Error(`Failed to fetch todos: ${error.message}`);
  }
};

// Get a specific todo by ID
export const getTodoById = async (todoId, chatId) => {
  try {
    const todo = await Todo.findOne({ _id: todoId, telegramChatId: chatId });
    
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    return todo;
  } catch (error) {
    throw new Error(`Failed to fetch todo: ${error.message}`);
  }
};

// Update a todo
export const updateTodo = async (todoId, chatId, updateData) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, telegramChatId: chatId }, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!updatedTodo) {
      throw new Error('Todo not found');
    }
    
    return updatedTodo;
  } catch (error) {
    throw new Error(`Failed to update todo: ${error.message}`);
  }
};

// Delete a todo
export const deleteTodo = async (todoId, chatId) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, telegramChatId: chatId });
    
    if (!deletedTodo) {
      throw new Error('Todo not found');
    }
    
    return deletedTodo;
  } catch (error) {
    throw new Error(`Failed to delete todo: ${error.message}`);
  }
};

// Toggle todo completion status
export const toggleTodoCompletion = async (todoId, chatId) => {
  try {
    const todo = await Todo.findOne({ _id: todoId, telegramChatId: chatId });
    
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    todo.completed = !todo.completed;
    await todo.save();
    
    return todo;
  } catch (error) {
    throw new Error(`Failed to toggle todo completion: ${error.message}`);
  }
};
