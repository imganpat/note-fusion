# Note Fusion

A modern, full-stack notes management application designed for secure and efficient note-taking. Users can create, update, and organize notes with ease while benefiting from authentication, full-screen viewing, and note-sharing capabilities. The app ensures data security and an intuitive user experience by leveraging powerful frontend and backend technologies.

## 🎯 Demo

If you'd like to see the app in action, you can check out the live [demo](https://note-fusion-gc.vercel.app).

## 📝 Objective and Aim

The goal of this project is to provide users with a secure and feature-rich notes management system. With authentication, users can securely store personal notes, and the sharing feature enables controlled access, ensuring privacy while allowing collaboration.

## 🚀 Features

1. User Authentication - Users can register and log in to secure their notes.
1. Full-Screen Note Viewing - Users can view notes in full screen for better readability.
1. Note Sharing - Share notes with others. The shared note is view-only for viewers, while the creator retains editing rights.
1. Responsive UI - Built with Tailwind CSS for a clean and modern look.
1. Smooth Animations - Enhanced user experience using GSAP.
1. State Management - Efficiently managed with Redux Toolkit.
1. Secure Backend - Built with Node.js, Express, and MySQL for a reliable and scalable architecture.

## 🛠️ Tech Stack

**Frontend**

- React - UI Library
- Redux Toolkit - State Management
- Tailwind CSS - Styling
- GSAP - Animations

**Backend**

- Node.js - JavaScript Runtime
- Express - Web Framework
- MySQL - Database

## 🖥️ How to Run Locally

### Prerequisites

- Node.js (v14+)
- MySQL
- npm or yarn

1. **Clone the project**

   ```bash
   git clone https://github.com/imganpat/note-fusion.git
   cd note-fusion
   ```

2. **Install dependencies**
   Navigate to both frontend(client) and backend(server) directories and install the required packages:

   For Frontend:

   ```bash
   cd client
   npm install
   ```

   For Backend:

   ```bash
   cd server
   npm install
   ```

3. **Environment Variables**
   To run this project, you will need to create and setup a .env file with the following environment variables in server directory

   `SERVER_PORT`
   `DATABASE_NAME`
   `DATABASE_HOST`
   `DATABASE_USERNAME`
   `DATABASE_PASSWORD`
   `JWT_SECRET`

   ```bash
   cd server
   ```

   ```bash
   echo SERVER_PORT = 3000 >> .env
   echo DATABASE_NAME = NoteFusion >> .env
   echo DATABASE_HOST = localhost >> .env
   echo DATABASE_USERNAME = root >> .env
   echo DATABASE_PASSWORD = '""' >> .env
   echo JWT_SECRET = your_jwt_secret >> .env
   ```

4. **Start the MySQL server**
   Make sure your MySQL server is running and accessible with the credentials provided in the .env file.

5. **Run the application**

   Start Backend:

   ```bash
   cd server
   npm start
   ```

   Start Frontend:

   ```bash
   cd client
   npm run dev
   ```

## Access the Application

The frontend will run on http://localhost:5173, and the backend API will be available on http://localhost:3000. use /api/notes route to access the notes.

## License

[MIT](https://choosealicense.com/licenses/mit/)
