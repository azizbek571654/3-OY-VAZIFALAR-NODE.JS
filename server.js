import app from './src/index.js';
import dotenv from 'dotenv';

dotenv.config();

// Set port
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
