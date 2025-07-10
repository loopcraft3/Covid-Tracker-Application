# COVID Tracker App

A full-stack MERN application to manage and analyze COVID-19 data. This app supports CSV data import, complete CRUD operations, filtering, and a responsive React-based frontend.


## 📌 Features

- 📥 Import COVID data from CSV into MongoDB
- 🧮 Perform full CRUD (Create, Read, Update, Delete) operations
- 🔍 Filter/search records based on criteria (e.g., cases > 1000)
- ⚙️ RESTful API built with Node.js, Express.js & Mongoose
- 💻 Responsive frontend using React and Axios
- 📂 Organized folder structure for backend and frontend

---

## 🛠 Tech Stack

| Layer      | Technologies                        |
|------------|-------------------------------------|
| Frontend   | React, Axios                        |
| Backend    | Node.js, Express.js, Mongoose       |
| Database   | MongoDB                             |
| Others     | CSV Parser, Git, Postman            |

---

## ⚙️ How to Run the Project Locally

### 🔁 1. Clone the Repository

// ```bash
- git clone https://github.com/loopcraft3/Covid-Tracker-Application.git
- cd Covid-Tracker-Application
---

### 🛠️ 2. Setup the Backend
bash
- cd backend
- npm install

Create a .env file inside the backend folder and add:
env
- MONGO_URI=mongodb://127.0.0.1:27017/covidTracker

Then run:
bash
- node server.js
- Your backend will run at http://localhost:5000.

### 🌐 3. Setup the Frontend
In a new terminal:

bash
- cd frontend
- npm install
- npm start
- Your frontend will run at http://localhost:3000.
