# To-Do List App with User Authentication

#### 1. Functionality
- Users can **register** with name, email, password, and phone.
- Users can **log in** and **log out** securely.
- Users can **view** and **edit** their personal details.
- Users can **add**, **edit**, and **delete** to-do items.
- Each to-do item includes:
  - Title
  - Description
  - Status (Completed/Pending)
  - Due Date
- Ability to **mark tasks** as completed or pending.
- Display a list of to-do items for the authenticated user with **filter options**:
  - Show completed
  - Show pending
- Implement a **search feature** to find tasks by title.

#### 2. Authentication
- **User authentication** with email and password.
- Passwords are securely **hashed using bcrypt**.
- Implemented **JWT (JSON Web Tokens)** for secure user authentication.

#### 3. Back-End
- Built with **Node.js (v20.17.0)** and **Express**.
- User data and to-do items are stored in **MongoDB**, managed via **Mongoose**.
- Developed **RESTful APIs** for:
  - User authentication
  - To-do item management
  - CRUD operations
- **Validations**, **middlewares**, and **error handlers** are implemented for data integrity and better error management.

#### 4. Front-End
- Developed using **React.js (TypeScript)**.
- UI is **user-friendly**, **simple**, and **responsive**.

#### 5. Project Structure
- Follows **MERN stack best practices**.
- Code is **modular**, **clean**, and **maintainable**.

---

### ⚙️ Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone <repository-link>
   cd todo-list-app
   ```

2. **Install Dependencies:**
   - For the **Back-End**:
     ```bash
     cd backend
     npm install
     ```
   - For the **Front-End**:
     ```bash
     cd frontend
     npm install
     ```

3. **Environment Configuration:**
   - Create a `.env` file in the root directory of the backend:
     ```env
     MONGO_URI=mongodb+srv://mongodb:mongodb@todo-list.m2hvf.mongodb.net/?retryWrites=true&w=majority&appName=todo-list
     JWT_SECRET=todolistapp
     ```

4. **Run the Application:**
   - For the **Back-End**:
     ```bash
     npm run dev
     ```
   - For the **Front-End**:
     ```bash
     npm run dev
     ```

---

### 📦 Dependencies

- **Back-End:**
  - Node.js v20.17.0
  - Express
  - Mongoose
  - Bcrypt
  - JSON Web Token (JWT)

- **Front-End:**
  - React.js (TypeScript)

---

### 🚨 Notes
- Backend includes **validations**, custom **middlewares**, and robust **error handling**.
- **MongoDB connection** is configured via an **online server** using the provided `.env` settings.
