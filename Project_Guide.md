# URL Shortener Backend Development Guide (Node.js & MySQL)

This guide provides a step-by-step approach to building the robust backend for your URL Shortener project.

## 1. Prerequisites

- **Node.js** installed on your system.
- **MySQL Server** installed and running.
- **Postman** or **Thunder Client** for API testing.

---

## 2. Database Setup (MySQL)

First, create the database and the required table for storing URLs.

```sql
CREATE DATABASE IF NOT EXISTS url_shortener;
USE url_shortener;

CREATE TABLE IF NOT EXISTS urls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_url VARCHAR(255) UNIQUE NOT NULL,
    clicks INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Project Initialization

Navigate to your `Backend` folder and initialize a new Node.js project.

```bash
cd Backend
npm init -y
```

---

## 4. Installing Dependencies

Install the essential packages for an Express server and MySQL integration.

```bash
npm install express mysql2 dotenv cors nanoid
npm install --save-dev nodemon
```

- `express`: Fast and minimalist web framework.
- `mysql2`: Driver for connecting to your MySQL database.
- `dotenv`: Loads environment variables from a `.env` file to `process.env`.
- `cors`: Enables Cross-Origin Resource Sharing (crucial for Frontend integration).
- `nanoid`: Generates unique IDs for short URLs (if not using custom tails).
- `nodemon`: Automatically restarts the server during development.

---

## 5. Environment Configuration

Create a `.env` file in the `Backend` directory to store sensitive information.

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=url_shortener
```

---

## 6. Database Connection Setup

Create a `config/db.js` file to handle the MySQL connection pool.

```javascript
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
```

---

## 7. API Implementation

### Create Short URL Endpoint

In your route handler (e.g., `routes/url.js`):

1. Receive `originalUrl` and optional `customTail` from the request body.
2. Validate the URL.
3. Check if `customTail` is provided; if so, verify its uniqueness in the database.
4. If no `customTail`, generate a unique ID using `nanoid`.
5. Insert the new record into the `urls` table.
6. Return the `short_url` to the user.

### URL Redirection

In your main server or a specific redirect route:

1. Capture the `short_url` from the URL params (`GET /:shortId`).
2. Query the database for the corresponding `original_url`.
3. If found, increment the `clicks` count and use `res.redirect(originalUrl)`.

---

## 8. Main Server Setup (`server.js`)

Set up the core Express application.

```javascript
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes will be linked here...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
```

---

## 9. Integration with Frontend

Now that your API is ready:

1. Replace the `urls.json` logic in `URLShortner.jsx` with `fetch` or `axios` calls to `http://localhost:5000/api/...`.
2. Update the `handleSubmit` function to send the data to your `POST` endpoint.
3. Use `useEffect` to fetch the list of URLs from your `GET` endpoint.

---

## 10. Database Workflow: From Frontend to Database (Beginner's Guide)

Understanding how data moves through your application is key to backend development. Here is the life cycle of a URL in your project:

### Phase 1: Sending Data (Frontend → Backend)

1. **User Action**: The user types a long URL into the input field on your React app and clicks "Shorten".
2. **State Management**: React stores this input in a "state" variable (using `useState`).
3. **The Request**: Your frontend uses a library like **Axios** to send a `POST` request to your backend server (e.g., `http://localhost:5000/api/shorten`).
   - The body of this request contains the data: `{ "originalUrl": "https://verylong.com/..." }`.

### Phase 2: Processing & Storing (Backend → MySQL)

1. **Receiving**: The Express server receives the request.
2. **Logic**: The backend generates a unique "short code" (like `xY7z9`) or uses the custom tail provided by the user.
3. **Database Query**: The backend executes an SQL command using the `mysql2` driver:

   ```sql
   INSERT INTO urls (original_url, short_url) VALUES ('https://verylong.com/...', 'xY7z9');
   ```

4. **Confirmation**: Once MySQL saves the data, it sends a success message back to the backend.

### Phase 3: Retrieving & Displaying (Database → Frontend)

1. **Fetching**: When the page loads, the frontend sends a `GET` request to the backend.
2. **Database Read**: The backend asks MySQL for all stored URLs:

   ```sql
   SELECT * FROM urls ORDER BY created_at DESC;
   ```

3. **Response**: The backend sends this list of URLs back to the frontend as a JSON array.
4. **Rendering**: React receives this array, updates its state, and automatically "maps" over it to display those sleek cards you see in the "Recent Links" section.

---

## 11. Final Verification

- Test all endpoints with Postman.
- Ensure the redirection is working from the root domain.
- Verify that clicks are recorded correctly in the MySQL table.
