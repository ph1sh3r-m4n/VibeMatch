# 🎉 VibeMatch – Mood Based Hangout Platform

VibeMatch is a **mood-driven social discovery platform** that helps users find activities, events, and people based on how they feel at the moment.

Instead of endlessly scrolling for things to do, users simply **select their current mood**, and the platform suggests **nearby events, activities, and hangout opportunities** that match that vibe.

The goal of VibeMatch is to **make social planning faster, more spontaneous, and more fun**, especially for environments like **college campuses and communities**.

---

# 🚀 Features

## 🎭 Mood-Based Discovery

Users can select their current mood such as:

* 😌 Chill
* 🎉 Party
* 📚 Study
* 🍔 Food Hunt
* 🏋️ Workout
* 🎮 Gaming
* 🎬 Movie Night
* 🌿 Outdoor

The platform then recommends **events and activities matching that mood**.

---

## 📅 Event Creation

Users can create events by specifying:

* Event title
* Mood category
* Location
* Date and time
* Maximum participants
* Event description

Events can be **public or private**.

---

## 🗺️ Map-Based Event Discovery

The application includes a **map interface** that displays nearby events using location markers.

Users can:

* Explore nearby hangouts
* Filter events by mood
* View event details
* Join events instantly

---

## 💬 Real-Time Event Chat

Each event contains a **dedicated chat room** where participants can:

* Communicate with other attendees
* Share plans and updates
* Coordinate meetups

---

## 🗳️ Poll-Based Decision Making

To help groups decide quickly, users can create polls inside event chats such as:

* “Where should we go?”
* “What time should we meet?”

Participants vote and results update in real time.

---

# 🏗️ Tech Stack

### Frontend

* React
* TailwindCSS
* TypeScript

### Backend (Optional / Future)

* Node.js / Express or Laravel

### Database

* MongoDB / MySQL

### Real-Time Communication

* WebSockets / Socket.io

### Integrations

* Google Maps API

---

# 🧠 System Architecture

```
Users (Browser / Mobile)
        │
        ▼
Frontend (React + Tailwind)
        │
        ▼
Backend API (Node.js / Laravel)
        │
        ├── Authentication Service
        ├── Event Management Service
        ├── Chat Service
        │
        ▼
Database (MongoDB / MySQL)
```

---

# 📂 Project Structure

```
VibeMatch
│
├── public
│   └── assets
│
├── src
│   ├── components
│   │   ├── MoodCard
│   │   ├── EventCard
│   │   ├── ChatBubble
│   │   └── Sidebar
│   │
│   ├── pages
│   │   ├── LandingPage
│   │   ├── Dashboard
│   │   ├── EventCreation
│   │   ├── MapDiscovery
│   │   └── Profile
│   │
│   ├── styles
│   └── main.tsx
│
└── index.html
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/vibematch.git
```

Navigate to the project folder

```bash
cd vibematch
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

The application will run on:

```
http://localhost:5173
```

---

# 📸 Screenshots

Add screenshots of the following pages:

1. Landing Page
2. Dashboard
3. Event Creation Page
4. Map Discovery Page
5. Event Chat Interface
6. Profile Page

---

# 🎯 Use Cases

* College students planning hangouts
* Community event discovery
* Study group coordination
* Club meetups
* Spontaneous social gatherings

---

# 🔮 Future Improvements

* AI-based mood prediction
* Smart event recommendations
* Push notifications
* Mobile app version
* Event rating and feedback system

---

# 👨‍💻 Author

Developed by **Team VibeMatch**

---


