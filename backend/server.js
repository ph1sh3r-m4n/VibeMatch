const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Event = require('./models/Event');
const Message = require('./models/Message');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'vibematch_secret_key_dev';

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

async function startServer() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri, { dbName: "vibematch" });
  console.log("Connected to in-memory MongoDB");

  // Auth Routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
      res.status(201).json({ token, username: user.username, id: user._id });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ error: 'User not found' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
      res.json({ token, username: user.username, id: user._id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Event Routes
  app.get('/api/events', async (req, res) => {
    try {
      const { mood } = req.query;
      let filter = {};
      if (mood) filter.mood = mood;
      const events = await Event.find(filter).populate('host', 'username');
      
      const formatted = events.map(e => ({
        id: e._id,
        title: e.title,
        mood: e.mood,
        moodEmoji: e.moodEmoji,
        location: e.location,
        time: e.time,
        host: e.host ? e.host.username : 'Unknown',
        participants: e.participants.length,
        maxParticipants: e.maxParticipants,
        x: e.x,
        y: e.y
      }));
      res.json(formatted);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/events/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate('host', 'username');
      if (!event) return res.status(404).json({ error: 'Event not found' });
      res.json({
         id: event._id, title: event.title, mood: event.mood, moodEmoji: event.moodEmoji, 
         location: event.location, time: event.time, host: event.host ? event.host.username : 'Unknown', 
         participants: event.participants.length, maxParticipants: event.maxParticipants, x: event.x, y: event.y, description: event.description
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/events', authMiddleware, async (req, res) => {
    try {
      const { title, mood, location, time, maxParticipants, description, isPublic } = req.body;
      const emojis = {
        "Chill": "😌", "Party": "🎉", "Study": "📚", "Food Hunt": "🍔", 
        "Workout": "🏋️", "Gaming": "🎮", "Movie Night": "🎬", "Outdoor": "🌿"
      };
      const moodEmoji = emojis[mood] || "✨";
      const x = Math.floor(Math.random() * 80) + 10;
      const y = Math.floor(Math.random() * 80) + 10;

      const event = new Event({
        title, mood, moodEmoji, location, time, maxParticipants, description, isPublic, x, y,
        host: req.userId,
        participants: [req.userId]
      });
      await event.save();
      
      const populated = await event.populate('host', 'username');
      res.status(201).json({ id: populated._id, ...populated._doc, host: populated.host.username });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Chat Routes
  app.get('/api/events/:id/messages', async (req, res) => {
    try {
      const messages = await Message.find({ eventId: req.params.id }).sort('time');
      res.json(messages.map(m => ({
        id: m._id,
        eventId: m.eventId,
        username: m.username,
        avatar: m.avatar,
        message: m.message,
        time: m.time
      })));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Seed Data
  const count = await Event.countDocuments();
  if (count === 0) {
    const dummyUser = new User({ username: "System", password: "password" });
    await dummyUser.save();
    
    await Event.create([
      { title: "Chill Lofi Session", mood: "Chill", moodEmoji: "😌", location: "Campus Library Lawn", time: "Today, 5:00 PM", host: dummyUser._id, participants: [dummyUser._id], maxParticipants: 15, x: 25, y: 35 },
      { title: "Weekend Party Bash", mood: "Party", moodEmoji: "🎉", location: "Student Center", time: "Sat, 8:00 PM", host: dummyUser._id, participants: [dummyUser._id], maxParticipants: 50, x: 55, y: 20 },
      { title: "Study Group - Calculus", mood: "Study", moodEmoji: "📚", location: "Room 204, Science Hall", time: "Tomorrow, 2:00 PM", host: dummyUser._id, participants: [dummyUser._id], maxParticipants: 10, x: 70, y: 60 },
      { title: "Taco Tuesday Hunt", mood: "Food Hunt", moodEmoji: "🍔", location: "Downtown Area", time: "Tue, 12:00 PM", host: dummyUser._id, participants: [dummyUser._id], maxParticipants: 20, x: 40, y: 70 },
      { title: "Morning Yoga", mood: "Workout", moodEmoji: "🏋️", location: "Central Park", time: "Daily, 7:00 AM", host: dummyUser._id, participants: [dummyUser._id], maxParticipants: 25, x: 15, y: 55 },
      { title: "Smash Bros Tournament", mood: "Gaming", moodEmoji: "🎮", location: "Gaming Lounge", time: "Fri, 6:00 PM", host: dummyUser._id, participants: [dummyUser._id], maxParticipants: 16, x: 80, y: 40 }
    ]);
  }

  // Socket
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('join_event', (eventId) => {
      socket.join(eventId);
    });

    socket.on('send_message', async (data) => {
      const { eventId, username, avatar, message, time } = data;
      const msg = new Message({ eventId, username, avatar, message, time });
      await msg.save();
      io.to(eventId).emit('receive_message', {
        id: msg._id, eventId, username, avatar, message, time
      });
    });
  });

  server.listen(3000, () => console.log('Backend running on port 3000'));
}

startServer().catch(console.error);
