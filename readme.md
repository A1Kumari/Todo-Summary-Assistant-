Todo Summary Assistant
A full-stack application to manage your personal to-do list, generate meaningful summaries using a real Large Language Model (LLM), and send those summaries directly to a Slack channel.

Tech Stack
Frontend: React

Backend: Node.js with Express (Java Spring Boot alternative available)

Database: Supabase PostgreSQL (or Firebase Firestore)

LLM API: OpenAI (GPT-4/3.5)

Slack Integration: Slack Incoming Webhooks

Hosting: Netlify

Features
Manage your personal to-do list with add, edit, delete, and mark complete functionalities.

Generate a natural language summary of your pending tasks using an LLM.

Automatically post the summary to a specified Slack channel using Incoming Webhooks.

Getting Started
Clone the repository
bash
Copy code
git clone https://github.com/A1Kumari/Todo-Summary-Assistant-.git
cd todo-summary-assistant
Backend Setup
Create a .env file in the backend folder and configure it as follows:

env
Copy code
# Port for backend server
PORT=4000

# Database URL (Supabase PostgreSQL or MongoDB URI)
MONGO_URI=mongodb://localhost:27017/Todo

# JWT Secret for authentication (if used)
JWT_SECRET="4cU7z!gP$e@V1wLz^Dq8KsXr#Nm2TzMb"

# OpenAI or Cohere API key for LLM integration
LLM_API_KEY=your_llm_api_key

# Slack Incoming Webhook URL
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
Available Scripts (Frontend)
In the project directory, run:

npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.
The page reloads on code changes.

npm test
Launches the test runner in watch mode.

npm run build
Builds the app for production to the build folder with optimized bundles.

npm run eject
Warning: This is a one-way operation. Use only if you need full control over build configuration.

Learn More
Create React App Documentation

React Documentation

Code Splitting

Analyzing Bundle Size

Making a Progressive Web App

Advanced Configuration

Deployment

Troubleshooting Build Failures

LLM Integration
This project integrates a real LLM API (OpenAI GPT or Cohere) to generate summaries.

Setup
Sign up for an API key at OpenAI or Cohere.

Add your API key to the backend .env as LLM_API_KEY.

The backend sends the list of pending todos to the LLM API and receives a summarized text.

The summary is then forwarded to Slack via the configured webhook.

Slack Integration
Slack Incoming Webhooks enable posting messages from external apps to Slack channels.

Setup
Create a Slack Incoming Webhook in your workspace:
https://api.slack.com/messaging/webhooks

Choose the Slack channel for posting the summary.

Copy the webhook URL.

Add it to your backend .env as SLACK_WEBHOOK_URL.

API Endpoints
Method	Endpoint	Description
GET	/todos	Fetch all to-do items
POST	/todos	Add a new to-do item
DELETE	/todos/:id	Delete a to-do item by ID
PUT	/todos/:id	Edit a to-do item
PUT	/todos/:id/complete	Mark a task as complete
POST	/summarize	Summarize pending todos & send summary to Slack

Project Structure
bash
Copy code
/frontend     # React app source
/backend     # Node.js Express server
/database   # Supabase or MongoDB configuration files (if any)
/.env       # Environment variables for backend
Deployment
Frontend can be deployed on Netlify or Vercel.

Backend can be hosted on platforms like Heroku, Render, or your own server.

Make sure environment variables (LLM_API_KEY, SLACK_WEBHOOK_URL, MONGO_URI) are properly set in your deployment environment.

Contribution
Feel free to open issues or submit pull requests for improvements or bug fixes.
