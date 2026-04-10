const http = require('http');
const { io } = require('socket.io-client');

async function runTests() {
  console.log('--- STARTING TESTS ---');
  try {
    // 1. Register
    let res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser_e2e', password: 'password123' })
    });
    let data = await res.json();
    if (res.status === 400 && data.error === 'Username already exists') {
       res = await fetch('http://localhost:3000/api/auth/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ username: 'testuser_e2e', password: 'password123' })
       });
       data = await res.json();
    }
    if (!data.token) throw new Error('Registration/Login failed');
    const token = data.token;
    console.log('✅ Auth successful. Token received.');

    // 2. Fetch Events
    res = await fetch('http://localhost:3000/api/events');
    let events = await res.json();
    console.log(`✅ Fetched ${events.length} initial events.`);

    // 3. Create Event
    res = await fetch('http://localhost:3000/api/events', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: 'E2E Test Event', mood: 'Party', location: 'Virtual', time: 'Now' })
    });
    let newEvent = await res.json();
    if (!newEvent.id) throw new Error('Failed to create event');
    const eventId = newEvent.id;
    console.log(`✅ Event created successfully. ID: ${eventId}`);

    // 4. Socket Chat
    const socket = io('http://localhost:3000');
    await new Promise((resolve, reject) => {
      socket.on('connect', () => {
        console.log('✅ Socket connected');
        socket.emit('join_event', eventId);
        socket.on('receive_message', (msg) => {
          if (msg.message === 'Hello from E2E') {
            console.log('✅ Message received over socket!');
            socket.disconnect();
            resolve();
          }
        });
        socket.emit('send_message', {
          eventId,
          username: 'testuser_e2e',
          avatar: '🧑‍💻',
          message: 'Hello from E2E',
          time: '12:00 PM'
        });
        setTimeout(() => reject(new Error('Socket timeout')), 5000);
      });
    });

    // 5. Fetch Messages
    res = await fetch(`http://localhost:3000/api/events/${eventId}/messages`);
    let messages = await res.json();
    if (!messages.find(m => m.message === 'Hello from E2E')) throw new Error('Message not persisted in DB');
    console.log('✅ Message persisted in API!');

    console.log('🎉 ALL TESTS PASSED!');
  } catch (err) {
    console.error('❌ Test failed:', err.message || err);
    process.exit(1);
  }
}

runTests();
