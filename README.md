# AI Job Application Tracker 🚀

A full-stack MERN application to track job applications using a Kanban board with AI-powered job description parsing and resume suggestions.

---

## Features

- User Authentication (Register/Login with JWT)
- Kanban Board (Drag & Drop applications)
- Create, Edit, Delete applications
- AI Job Description Parsing (auto-fill company, role, skills)
- Resume Bullet Suggestions
- Match Score (based on skills)
- Works without OpenAI API using fallback logic

---

## Tech Stack

Frontend:
- React
- TypeScript
- Tailwind CSS
- Vite

Backend:
- Node.js
- Express
- TypeScript

Database:
- MongoDB

Authentication:
- JWT + bcrypt

AI:
- OpenAI API (optional) + fallback logic

---

## Setup Instructions

1. Clone repository

git clone https://github.com/Aryan-st11/ai-job-tracker.git  
cd ai-job-tracker  

---

2. Backend Setup

cd backend  
npm install  

Create a .env file:

PORT=3001  
MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret  
OPENAI_API_KEY=optional  

Run backend:

npm run dev  

---

3. Frontend Setup

cd frontend  
npm install  
npm run dev  

---

4. Open in browser

http://localhost:5173  

---

## Environment Variables

Check backend/.env.example

---

## Notes

- AI logic is implemented in service layer
- No API keys are hardcoded
- Includes fallback AI for demo without API key
- Handles errors and loading states properly

---

## Future Improvements

- Dashboard analytics
- Dark mode
- Search and filter
- Notifications / reminders

---

## Author

Aryan Choudhary