const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Inquiry = require('./models/Inquiry');
// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON data
const projectRoutes = require('./routes/projectRoutes');
const chatRoutes = require('./routes/chat');
app.use('/api', chatRoutes);
app.use('/api/projects', projectRoutes);
// Basic Route for Testing
app.get('/', (req, res) => {
  res.send('Construction API is running...');
});
app.post('/api/inquiry', async (req, res) => {
  try {
    const newInquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, data: newInquiry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`👷 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});