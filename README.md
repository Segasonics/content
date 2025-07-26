# 📝 MERN Content App

A full-stack Notes Management App built using the MERN stack (MongoDB, Express.js, React, Node.js). It includes user authentication, role-based access (admin/user), and an admin panel to approve or reject notes.

---

## 📁 Project Structure

my-app/
├── backend/ # Express.js server (API)
├── frontend/ # React app (Vite)
├── node_modules/
├── .env # Root environment file 
├── .gitignore


---

## 🚀 Tech Stack

- **Frontend**: React, Vite, Redux Toolkit, Tailwind CSS, Axios, React Router
- **Backend**: Express.js, MongoDB (Mongoose), JWT, Cookies
- **Auth**: Cookie-based JWT auth
- **Deployment Ready**: Netlify (frontend), Render (backend)

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Segasonics/content.git
cd content

Create a .env file in the  folder using the provided .env.example at the root
Fill in the required fields
MONGO_URI=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=


# root
npm install

# backend
cd ./backend
npm run dev

# frontend
cd ./frontend
npm install
npm run dev


