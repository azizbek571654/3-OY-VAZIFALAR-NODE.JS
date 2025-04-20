import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import * as todoController from './todoController.js';

dotenv.config();

// User states storage (in-memory for simplicity)
const userStates = new Map();
// Store user contacts
const userContacts = new Map();

// State constants
const STATES = {
  NEW_USER: 'NEW_USER',
  IDLE: 'IDLE',
  CREATING_TODO: 'CREATING_TODO',
  UPDATING_TODO: 'UPDATING_TODO',
  DELETING_TODO: 'DELETING_TODO',
  VIEWING_TODO: 'VIEWING_TODO'
};

// Field collection states
const CREATING_STATES = {
  WAITING_TITLE: 'WAITING_TITLE',
  WAITING_DESCRIPTION: 'WAITING_DESCRIPTION',
  WAITING_AUTHOR: 'WAITING_AUTHOR',
  WAITING_START_DATE: 'WAITING_START_DATE',
  WAITING_END_DATE: 'WAITING_END_DATE'
};

// Initialize bot with token from environment variables
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Initialize user state if not exists
const initUserState = (chatId) => {
  if (!userStates.has(chatId)) {
    userStates.set(chatId, {
      state: STATES.NEW_USER, // Changed from IDLE to NEW_USER
      creatingState: null,
      currentTodo: {},
      selectedTodoId: null
    });
  }
  return userStates.get(chatId);
};

// Create request contact keyboard
const getContactRequestKeyboard = () => {
  return {
    reply_markup: {
      keyboard: [
        [{
          text: 'Share Contact',
          request_contact: true
        }]
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  };
};

// Keyboard markup for main menu
const getMainMenuKeyboard = () => {
  return {
    reply_markup: {
      keyboard: [
        ['📝 Create Todo', '📋 List All Todos']
      ],
      resize_keyboard: true
    }
  };
};

// Display todo list with buttons for each
const displayTodoList = async (chatId) => {
  try {
    const todos = await todoController.getAllTodos(chatId);
    
    if (todos.length === 0) {
      await bot.sendMessage(chatId, 'You have no todos yet. Create one?', getMainMenuKeyboard());
      return;
    }
    
    // Create keyboard buttons for each todo
    const todoKeyboard = todos.map(todo => [
      {
        text: `${todo.completed ? '✅' : '⬜'} ${todo.title}`,
        callback_data: `view_${todo._id}`
      }
    ]);
    
    // Add back button at the bottom
    todoKeyboard.push([
      { text: 'Go back to menu', callback_data: 'back_to_menu' }
    ]);
    
    const message = 'All Todos:';
    const options = {
      reply_markup: {
        inline_keyboard: todoKeyboard
      }
    };
    
    await bot.sendMessage(chatId, message, options);
  } catch (error) {
    await bot.sendMessage(chatId, `Error fetching todos: ${error.message}`);
  }
};

// Display single todo with action buttons
const displayTodoDetails = async (chatId, todoId) => {
  try {
    const todo = await todoController.getTodoById(todoId, chatId);
    
    const formattedStartDate = new Date(todo.startDate).toLocaleString();
    const formattedEndDate = todo.endDate ? new Date(todo.endDate).toLocaleString() : 'Not set';
    
    const message = `
*${todo.title}*
${todo.completed ? '✅ Completed' : '⬜ Not completed'}

*Description:* ${todo.description}
*Author:* ${todo.author}
*Start Date:* ${formattedStartDate}
*End Date:* ${formattedEndDate}
    `;
    
    const options = {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: todo.completed ? 'Mark as Undone' : 'Mark as Done', callback_data: `toggle_${todo._id}` }
          ],
          [
            { text: 'Update', callback_data: `update_${todo._id}` },
            { text: 'Delete', callback_data: `delete_${todo._id}` }
          ],
          [
            { text: 'Back to List', callback_data: 'list_todos' }
          ],
          [
            { text: 'Go back to menu', callback_data: 'back_to_menu' }
          ]
        ]
      }
    };
    
    await bot.sendMessage(chatId, message, options);
    // Always send the main menu keyboard to keep it visible
    await bot.sendMessage(chatId, 'Use the menu options:', getMainMenuKeyboard());
  } catch (error) {
    await bot.sendMessage(chatId, `Error fetching todo: ${error.message}`);
  }
};

// Start creating a new todo
const startCreateTodo = async (chatId) => {
  const userState = initUserState(chatId);
  userState.state = STATES.CREATING_TODO;
  userState.creatingState = CREATING_STATES.WAITING_TITLE;
  userState.currentTodo = {};
  
  const cancelOption = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Cancel and return to menu', callback_data: 'back_to_menu' }]
      ]
    }
  };
  
  await bot.sendMessage(
    chatId, 
    'Let\'s create a new todo!\nPlease enter a title:',
    cancelOption
  );
};

// Process todo creation steps
const processTodoCreation = async (chatId, text) => {
  const userState = userStates.get(chatId);
  
  // Create cancel button for each step
  const cancelOption = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Cancel and return to menu', callback_data: 'back_to_menu' }]
      ]
    }
  };
  
  switch (userState.creatingState) {
    case CREATING_STATES.WAITING_TITLE:
      userState.currentTodo.title = text;
      userState.creatingState = CREATING_STATES.WAITING_DESCRIPTION;
      await bot.sendMessage(chatId, 'Great! Now enter a description:', cancelOption);
      break;
      
    case CREATING_STATES.WAITING_DESCRIPTION:
      userState.currentTodo.description = text;
      userState.creatingState = CREATING_STATES.WAITING_AUTHOR;
      await bot.sendMessage(chatId, 'Who is the author?', cancelOption);
      break;
      
    case CREATING_STATES.WAITING_AUTHOR:
      userState.currentTodo.author = text;
      userState.creatingState = CREATING_STATES.WAITING_START_DATE;
      await bot.sendMessage(
        chatId, 
        'Enter start date (leave empty for current date):\nFormat: YYYY-MM-DD',
        cancelOption
      );
      break;
      
    case CREATING_STATES.WAITING_START_DATE:
      if (text && text.trim() !== '') {
        // Simple date validation - can be improved
        if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
          await bot.sendMessage(
            chatId, 
            'Invalid date format. Please use YYYY-MM-DD format:',
            cancelOption
          );
          return;
        }
        userState.currentTodo.startDate = new Date(text);
      }
      
      userState.creatingState = CREATING_STATES.WAITING_END_DATE;
      await bot.sendMessage(
        chatId, 
        'Enter end date (leave empty if none):\nFormat: YYYY-MM-DD',
        cancelOption
      );
      break;
      
    case CREATING_STATES.WAITING_END_DATE:
      if (text && text.trim() !== '') {
        // Simple date validation - can be improved
        if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
          await bot.sendMessage(
            chatId, 
            'Invalid date format. Please use YYYY-MM-DD format:',
            cancelOption
          );
          return;
        }
        userState.currentTodo.endDate = new Date(text);
      }
      
      // Create the todo
      try {
        const newTodo = await todoController.createTodo(chatId, userState.currentTodo);
        await bot.sendMessage(
          chatId, 
          `✅ Todo "${newTodo.title}" created successfully!`,
          getMainMenuKeyboard()
        );
        
        // After creating todo, show the todo list with the new todo
        setTimeout(() => {
          displayTodoList(chatId);
        }, 500);
      } catch (error) {
        await bot.sendMessage(
          chatId, 
          `Error creating todo: ${error.message}`,
          getMainMenuKeyboard()
        );
      }
      
      // Reset state
      userState.state = STATES.IDLE;
      userState.creatingState = null;
      userState.currentTodo = {};
      break;
  }
};

// Delete todo confirmation
const confirmDeleteTodo = async (chatId, todoId) => {
  try {
    const todo = await todoController.getTodoById(todoId, chatId);
    
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Yes, Delete', callback_data: `confirm_delete_${todoId}` },
            { text: 'Cancel', callback_data: `view_${todoId}` }
          ]
        ]
      }
    };
    
    await bot.sendMessage(
      chatId, 
      `Are you sure you want to delete "${todo.title}"?`,
      options
    );
  } catch (error) {
    await bot.sendMessage(chatId, `Error: ${error.message}`);
  }
};

// Start the bot
export const startBot = () => {
  // Handle start command
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userState = initUserState(chatId);
    
    // Check if user has shared contact already
    if (userContacts.has(chatId)) {
      userState.state = STATES.IDLE;
      await bot.sendMessage(
        chatId,
        'Welcome back to the Todo Manager Bot! 👋\nWhat would you like to do?',
        getMainMenuKeyboard()
      );
    } else {
      // New user, request contact
      await bot.sendMessage(
        chatId,
        'Welcome to the Todo Manager Bot! 👋\nPlease share your contact information to proceed.',
        getContactRequestKeyboard()
      );
    }
  });
  
  // Handle contact sharing
  bot.on('contact', async (msg) => {
    const chatId = msg.chat.id;
    const userState = initUserState(chatId);
    
    if (msg.contact) {
      // Save user contact
      userContacts.set(chatId, {
        phone: msg.contact.phone_number,
        firstName: msg.contact.first_name,
        lastName: msg.contact.last_name
      });
      
      // Update user state
      userState.state = STATES.IDLE;
      
      // Send welcome message with main menu
      await bot.sendMessage(
        chatId,
        'Thank you for sharing your contact information!\nNow you can use the Todo Manager Bot.',
        getMainMenuKeyboard()
      );
    }
  });
  
  // Handle "Create Todo" command
  bot.onText(/📝 Create Todo/, async (msg) => {
    const chatId = msg.chat.id;
    
    // Check if user has shared contact
    if (!userContacts.has(chatId)) {
      await bot.sendMessage(
        chatId,
        'Please share your contact information first to use this feature.',
        getContactRequestKeyboard()
      );
      return;
    }
    
    await startCreateTodo(chatId);
  });
  
  // Handle "List All Todos" command
  bot.onText(/📋 List All Todos/, async (msg) => {
    const chatId = msg.chat.id;
    
    // Check if user has shared contact
    if (!userContacts.has(chatId)) {
      await bot.sendMessage(
        chatId,
        'Please share your contact information first to use this feature.',
        getContactRequestKeyboard()
      );
      return;
    }
    
    await displayTodoList(chatId);
  });
  
  // Handle callback queries (button clicks)
  bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    
    // Check if user has shared contact
    if (!userContacts.has(chatId)) {
      await bot.sendMessage(
        chatId,
        'Please share your contact information first to use this feature.',
        getContactRequestKeyboard()
      );
      return;
    }
    
    // Acknowledge the callback query
    await bot.answerCallbackQuery(callbackQuery.id);
    
    if (data === 'back_to_menu') {
      // Reset user state and show main menu
      const userState = initUserState(chatId);
      userState.state = STATES.IDLE;
      userState.creatingState = null;
      userState.currentTodo = {};
      userState.selectedTodoId = null;
      
      await bot.sendMessage(
        chatId,
        'Returned to main menu. What would you like to do?',
        getMainMenuKeyboard()
      );
    }
    else if (data === 'list_todos') {
      await displayTodoList(chatId);
    } 
    else if (data.startsWith('view_')) {
      const todoId = data.split('_')[1];
      await displayTodoDetails(chatId, todoId);
    } 
    else if (data.startsWith('toggle_')) {
      const todoId = data.split('_')[1];
      try {
        const updatedTodo = await todoController.toggleTodoCompletion(todoId, chatId);
        await displayTodoDetails(chatId, todoId);
        
        const statusMessage = updatedTodo.completed ? 
          '✅ Todo marked as completed!' : 
          '⬜ Todo marked as not completed!';
        
        await bot.sendMessage(chatId, statusMessage);
      } catch (error) {
        await bot.sendMessage(chatId, `Error: ${error.message}`);
      }
    } 
    else if (data.startsWith('delete_')) {
      const todoId = data.split('_')[1];
      await confirmDeleteTodo(chatId, todoId);
    } 
    else if (data.startsWith('confirm_delete_')) {
      const todoId = data.split('_')[2];
      try {
        await todoController.deleteTodo(todoId, chatId);
        await bot.sendMessage(chatId, '✅ Todo deleted successfully!');
        await displayTodoList(chatId);
      } catch (error) {
        await bot.sendMessage(chatId, `Error deleting todo: ${error.message}`);
      }
    } 
    else if (data.startsWith('update_')) {
      const todoId = data.split('_')[1];
      const userState = initUserState(chatId);
      
      try {
        const todo = await todoController.getTodoById(todoId, chatId);
        
        userState.state = STATES.UPDATING_TODO;
        userState.selectedTodoId = todoId;
        
        const options = {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Title', callback_data: `update_field_title_${todoId}` }],
              [{ text: 'Description', callback_data: `update_field_description_${todoId}` }],
              [{ text: 'Author', callback_data: `update_field_author_${todoId}` }],
              [{ text: 'Start Date', callback_data: `update_field_startDate_${todoId}` }],
              [{ text: 'End Date', callback_data: `update_field_endDate_${todoId}` }],
              [{ text: 'Cancel', callback_data: `view_${todoId}` }]
            ]
          }
        };
        
        await bot.sendMessage(chatId, 'What would you like to update?', options);
      } catch (error) {
        await bot.sendMessage(chatId, `Error: ${error.message}`);
      }
    } 
    else if (data.startsWith('update_field_')) {
      const parts = data.split('_');
      const field = parts[2];
      const todoId = parts[3];
      
      const userState = initUserState(chatId);
      userState.state = STATES.UPDATING_TODO;
      userState.creatingState = `updating_${field}`;
      userState.selectedTodoId = todoId;
      
      const cancelOption = {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Cancel and return to menu', callback_data: 'back_to_menu' }]
          ]
        }
      };
      
      let promptMessage;
      switch (field) {
        case 'title':
          promptMessage = 'Enter new title:';
          break;
        case 'description':
          promptMessage = 'Enter new description:';
          break;
        case 'author':
          promptMessage = 'Enter new author:';
          break;
        case 'startDate':
          promptMessage = 'Enter new start date (YYYY-MM-DD):';
          break;
        case 'endDate':
          promptMessage = 'Enter new end date (YYYY-MM-DD):';
          break;
      }
      
      await bot.sendMessage(chatId, promptMessage, cancelOption);
    }
  });
  
  // Handle text messages (for todo creation and updates)
  bot.on('message', async (msg) => {
    if (!msg.text || msg.text.startsWith('/') || msg.text.startsWith('📝') || msg.text.startsWith('📋')) {
      return; // Skip commands and menu items
    }
    
    const chatId = msg.chat.id;
    const userState = userStates.get(chatId);
    
    if (!userState) {
      return;
    }
    
    // Check if user has shared contact for text message interactions
    if (!userContacts.has(chatId) && userState.state !== STATES.NEW_USER) {
      await bot.sendMessage(
        chatId,
        'Please share your contact information first to use this feature.',
        getContactRequestKeyboard()
      );
      return;
    }
    
    if (userState.state === STATES.CREATING_TODO) {
      await processTodoCreation(chatId, msg.text);
    } 
    else if (userState.state === STATES.UPDATING_TODO && userState.creatingState?.startsWith('updating_')) {
      const field = userState.creatingState.split('_')[1];
      const todoId = userState.selectedTodoId;
      
      try {
        let updateData = {};
        
        // Handle date fields
        if (field === 'startDate' || field === 'endDate') {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(msg.text)) {
            await bot.sendMessage(
              chatId, 
              'Invalid date format. Please use YYYY-MM-DD format:'
            );
            return;
          }
          updateData[field] = new Date(msg.text);
        } else {
          updateData[field] = msg.text;
        }
        
        await todoController.updateTodo(todoId, chatId, updateData);
        await bot.sendMessage(chatId, `✅ Todo ${field} updated successfully!`);
        
        // Reset state and show updated todo
        userState.state = STATES.IDLE;
        userState.creatingState = null;
        await displayTodoDetails(chatId, todoId);
      } catch (error) {
        await bot.sendMessage(chatId, `Error updating todo: ${error.message}`);
      }
    }
  });
  
  console.log('Telegram bot started successfully!');
  return bot;
};
