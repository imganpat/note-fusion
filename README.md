# Note Fusion

This is a modern, full-stack notes management application that lets users effortlessly create, organize, and update notes. Built with a seamless and responsive interface, this app leverages powerful frontend and backend technologies to deliver a smooth user experience. It integrates Redux for efficient state management, Tailwind CSS for sleek design, and GSAP for engaging animations. On the backend, Node.js, Express, and MySQL work together to provide a reliable and secure data handling solution.

## 🎯 Demo

If you'd like to see the app in action, you can check out the live [demo](https://note-fusion-gc.vercel.app).

## 📝 Objective and Aim

The objective of this project is to provide users with an efficient platform to manage their notes. The aim is to deliver a responsive, intuitive, and aesthetically pleasing interface while ensuring robust backend performance with a secure database connection.

## 🚀 Features

- Create, Read, Update, and Delete (CRUD) operations for notes.
- Responsive UI built with Tailwind CSS.
- Smooth animations using GSAP.
- State management using Redux Toolkit.
- Secure backend API using Node.js and Express.
- Persistent storage with MySQL database.

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
   ```

2. **Install dependencies**
   Navigate to both frontend(client) and backend(server) directories and install the required packages:

   For Backend:

   ```bash
   cd server
   npm install
   ```

   For Frontend:

   ```bash
   cd client
   npm install
   ```

3. **Environment Variables**
   To run this project, you will need to create a .env file with the following environment variables in server directory

   `SERVER_PORT`
   `DATABASE_NAME`
   `DATABASE_HOST`
   `DATABASE_USERNAME`
   `DATABASE_PASSWORD`

   ```bash
   cd server
   ```

   ```bash
   echo SERVER_PORT = 3000 >> .env
   echo DATABASE_NAME = NoteFusion >> .env
   echo DATABASE_HOST = localhost >> .env
   echo DATABASE_USERNAME = root >> .env
   echo DATABASE_PASSWORD = '""' >> .env
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
