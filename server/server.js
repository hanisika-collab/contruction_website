const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/db');
const Inquiry = require('./models/Inquiry');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' })); // increased for base64 image uploads
app.use(express.urlencoded({ limit: '20mb', extended: true }));

const projectRoutes = require('./routes/projectRoutes');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');

app.use('/api', chatRoutes);
app.use('/api', adminRoutes);          // handles /api/admin/login, /api/packages
app.use('/api/projects', projectRoutes);

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
  console.log(`👷 Server running on port ${PORT}`);
});