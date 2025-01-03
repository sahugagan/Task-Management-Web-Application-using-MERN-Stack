
# Task Management Web Application using MERN Stack



This is a Task Management Web Application built using the MERN stack (MongoDB, Express, React, Node.js). The application helps users manage their daily tasks by allowing them to create, view, update, and delete tasks efficiently. It provides a clean and responsive interface for both users and developers, along with features like authentication, data validation, and token-based security. The project utilizes Redux for state management and Tailwind CSS for responsive and modern styling. This application is ideal for anyone looking to manage their tasks effectively.


# Features

## User-Side Features
Signup – Users can sign up by providing their name, email, and password.

Login – Users can log in to their account using their email and password.

Logout – Users can log out from the application.
Add Tasks – Users can create new tasks by entering details like title, description, and due date.

View Tasks – Users can view a list of all their tasks.

Update Tasks – Users can modify their existing tasks.

Delete Tasks – Users can delete tasks they no longer need.

## Developer-Side Feature

Toasts for Success/Failure – Dynamic toast messages indicating success or failure of actions.

Form Validations – Frontend and backend validations for user input.
Responsive Navbar – A navigation bar that adapts to different screen sizes.

Token-Based Authentication – Secure login and registration using JWT.

404 Page for Wrong URLs – Displays a 404 page when a user accesses an invalid route.

Global User State – User authentication status managed globally using Redux.

Custom Loaders – Loaders indicating data fetching processes.

Tailwind CSS – Utility-first CSS framework for styling.

Dynamic Document Titles – Titles change dynamically based on the page route.

Routes Protection – Prevents access to certain routes without authentication.

Middleware for Backend Authentication – Ensures that only authorized users can access specific backend routes.

Various HTTP Status Codes – Standardized response status codes for API requests.


## Screenshots

![App Screenshot](https://res.cloudinary.com/dw1leavm8/image/upload/v1735940626/my1_hubhpu.png)

![App Screenshot](https://res.cloudinary.com/dw1leavm8/image/upload/v1735940626/my2_krt6xw.png)

![App Screenshot](https://res.cloudinary.com/dw1leavm8/image/upload/v1735940625/my3_ksuotr.png)

![App Screenshot](https://res.cloudinary.com/dw1leavm8/image/upload/v1735940625/my4_bswjkf.png)

![App Screenshot](https://res.cloudinary.com/dw1leavm8/image/upload/v1735940625/my5_yajycu.png)

![App Screenshot](https://res.cloudinary.com/dw1leavm8/image/upload/v1735940625/my6_cd6ej0.png)

![App Screenshot](https://res.cloudinary.com/dw1leavm8/image/upload/v1735940873/my7_xohu79.png)

## Tools and Technolgies

### Frontend:

HTML

CSS (Tailwind CSS)

JavaScript (React)

Redux

### Backend:

Node.js

Express.js

MongoDB

JWT Authentication

### Other Tools:

Git & GitHub for version control
## Reqirements

Node.js and npm installed on your machine.

MongoDB running locally or use a cloud-based MongoDB service.

A code editor like Visual Studio Code for development.

## Installation

### 1. Clone the Repository

```bash
  git clone https://github.com/your-username/project-name.git

```

### 2. Install Dependencies

```bash
  npm run install-all

```

### 3.  Set Up Environment Variables

Create a .env file in the backend folder.

Replace the example values with your own credentials.

### 4. Command For Run Frontend

```bash
npm start

```

### 5. Command for Run Backend

```bash
npm run dev

```

    
## Backend API

Here are the available routes for the backend:

. POST /api/auth/signup – Register a new user.

. POST /api/auth/login – Login to the system.

. GET /api/tasks – Get all tasks.

. POST /api/tasks – Create a new task.

. PUT /api/tasks/:taskId – Update an existing task.

. DELETE /api/tasks/:taskId – Delete a task.
## Links

### Official Docs:

React Docs: https://reactjs.org/docs/

Node.js Docs: https://nodejs.org/en/docs/

MongoDB Docs: https://docs.mongodb.com/
## Support

Email: sahugagan302@gmail.com

LinkedIn: https://www.linkedin.com/in/gagan-sahu-b72405241?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
