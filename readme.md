# Todo Summary Assistant 📝✨

A full-stack application to manage your personal to-do list, generate AI-powered summaries using Large Language Models (LLMs), and send those summaries directly to your Slack channel.

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/Supabase-PostgreSQL-9cf)](https://supabase.com/)

## Features 🚀

- ✅ Add, edit, delete, and mark to-do tasks as complete
- 🤖 Generate natural language summaries of pending tasks using OpenAI GPT
- 📨 Automatically post summaries to Slack via webhooks
- 🔒 JWT authentication support
- 📱 Responsive React frontend

## Tech Stack 🛠️

**Frontend:**  
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/-React_Router-CA4245?logo=react-router)

**Backend:**  
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?logo=express)

**Database:**  
![Supabase](https://img.shields.io/badge/-Supabase-3FCF8E?logo=supabase)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql)

**AI & Integrations:**  
![OpenAI](https://img.shields.io/badge/-OpenAI-412991?logo=openai)
![Slack](https://img.shields.io/badge/-Slack-4A154B?logo=slack)

## Getting Started 🌟

### Prerequisites

- Node.js 18.x+
- npm 9.x+
- PostgreSQL database (Supabase recommended)
- OpenAI API key
- Slack workspace with webhook permissions

### Installation

1. Clone the repository:
```bash
git clone https://github.com/A1Kumari/Todo-Summary-Assistant-.git
cd todo-summary-assistant

Set up backend environment:

bash
cd backend
cp .env.example .env
Edit .env with your credentials:

env
PORT=4000
MONGO_URI=mongodb://localhost:27017/Todo
JWT_SECRET="your_jwt_secret"
LLM_API_KEY="sk-your-openai-key"
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
Install dependencies:

bash
cd ../frontend && npm install
cd ../backend && npm install
Running Locally
Backend:

bash
cd backend
npm start
Frontend:

bash
cd frontend
npm start
Open http://localhost:3000 in your browser.

API Endpoints 🔌
Method	Endpoint	Description
GET	/todos	Fetch all to-do items
POST	/todos	Add new to-do item
DELETE	/todos/:id	Delete to-do item
PUT	/todos/:id	Edit to-do item
PUT	/todos/:id/complete	Mark task as complete
POST	/summarize	Generate summary & send to Slack
AI Integration 🤖
The system uses OpenAI's GPT models to generate human-readable summaries. Example prompt:

"Generate a concise summary of these tasks in natural language: {tasks}"

To modify the prompt template:

javascript
// backend/controllers/summaryController.js
const prompt = `Your custom prompt template here: ${tasks}`;
Slack Configuration 💬
Create a Slack app at api.slack.com

Enable Incoming Webhooks

Copy your webhook URL to .env

Test integration using Postman or the /summarize endpoint

Slack Integration Diagram

Deployment 🚀
Frontend:
Deploy to Netlify

Backend:
Deploy to Heroku

Remember to set environment variables in your hosting platform!

Project Structure 📂
todo-summary-assistant/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.js
│       └── index.js
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
└── README.md
