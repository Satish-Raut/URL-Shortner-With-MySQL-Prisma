# Cookies in Web Development

## What is a Cookie?

A **cookie** is a small piece of data that a server sends to the user's web browser. The browser may store it and send it back with later requests to the same server. Cookies are primarily used for three purposes:

1. **Session Management**: Logins, shopping carts, game scores, or anything else the server should remember.
2. **Personalization**: User preferences, themes, and other settings.
3. **Tracking**: Recording and analyzing user behavior.

Cookies are essential for authentication. Because HTTP is stateless (each request is independent), cookies allow the server to "remember" that a user is successfully logged in.

---

## Setting up Cookies in Express.js and React

When your Frontend (React) and Backend (Express.js) run on different ports (e.g., frontend on `http://localhost:5173` and backend on `http://localhost:3000`), they are considered **Cross-Origin**. Browsers block cross-origin cookies by default for security.

To make them work, you need to configure three things:

### 1. Backend: CORS Configuration (`app.js`)

You must tell your Express server to allow credentials (cookies, authorization headers) from your specific frontend origin. You cannot use a wildcard (`*`) for the origin when `credentials` is true.

```js
// In your app.js or server.js
import cors from "cors";
import express from "express";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // MUST match your frontend URL exactly
    credentials: true, // REQUIRED to allow cookies
  }),
);
```

### 2. Frontend: Axios Configuration (`LoginPage.jsx`)

By default, Axios and the Fetch API do **not** send cookies to cross-origin requests. You must explicitly tell Axios to include them by setting `withCredentials: true`.

```js
import axios from "axios";

// Example of a login request
const loginUser = async (formData) => {
  const response = await axios.post("http://localhost:3000/login", formData, {
    withCredentials: true, // REQUIRED to send/receive cookies
  });
  return response.data;
};
```

### 3. Backend: Setting the Cookie (`auth.controller.js`)

When the user successfully logs in, the backend sends a response with a `Set-Cookie` header. In Express, you can do this manually using `res.setHeader` or using the built-in `res.cookie` helper method.

```js
export const postLogin = (req, res) => {
  // Option 1: Manual Header
  // res.setHeader("Set-Cookie", "isLoggedIn=true; path=/;");

  // Option 2: Express Cookie Helper (Recommended)
  res.cookie("isLoggedIn", "true", {
    maxAge: 1000 * 60 * 60 * 24, // 1 Day
    httpOnly: true, // Prevents JavaScript (XSS) from reading the cookie
    secure: process.env.NODE_ENV === "production", // Must be true in production (Requires HTTPS)
    sameSite: "strict", // Adjust to "lax" or "none" depending on cross-site requirements
  });

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
  });
};
```

### Cookie Security Flags Explained

- `httpOnly`: When set to true, client-side JavaScript (like `document.cookie`) cannot access the cookie. This prevents Cross-Site Scripting (XSS) attacks from stealing the cookie.
- `secure`: When set to true, the cookie is only sent over HTTPS connections (or localhost during development).
- `sameSite`: Controls whether the cookie is sent with cross-site requests.
  - `strict`: Cookie is only sent if the request originates from the same site.
  - `lax`: Cookie is sent on top-level navigations (like following a link).
  - `none`: Cookie is sent with all cross-site requests (requires `secure: true`).

---

## 4. Backend: Reading the Cookie (`cookie-parser`)

To easily read the cookies sent by the frontend on subsequent requests, you should install the `cookie-parser` middleware.

**Installation:**

```bash
npm install cookie-parser
```

**Configuration (`app.js`):**
Import and use the middleware before your routes.

```js
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Use the middleware
app.use(cookieParser());

// ... other middlewares and routes
```

**Retrieving cookies in a Controller/Middleware:**
Once `cookie-parser` is used, the cookies sent by the user's browser are available on the `req.cookies` object.

```js
// Example: A protected route middleware
export const checkAuth = (req, res, next) => {
  // Access the cookie we set earlier
  const isLoggedIn = req.cookies.isLoggedIn;

  if (isLoggedIn === "true") {
    console.log("User is authenticated!");
    next();
  } else {
    res.status(401).json({ message: "Unauthorized: Please log in" });
  }
};
};
```

---

## 5. Troubleshooting: Why is `req.cookies` returning empty (`{}`) ?

If you have setup `cookie-parser` but your backend `console.log(req.cookies)` still shows an empty object like `[Object: null prototype] {}` or misses your expected cookie, it is almost always one of these **two issues**:

### Issue A: The Frontend isn't sending the cookie

Even if the browser has saved the cookie, Axios (and Fetch) will refuse to attach it to requests sent to a different port/domain unless you explicitly enable it.
**Fix:**
Ensure **EVERY** single Axios request that needs authentication (GET, POST, PUT, DELETE) includes `{ withCredentials: true }`.

```js
// This MUST be on every protected request, not just the login!
const getDashboardData = await axios.get("http://localhost:3000/dashboard", {
  withCredentials: true,
});
```

### Issue B: The Backend's `Set-Cookie` is being rejected by the browser

When testing locally (e.g. your Vite app is on `:5173` and Express is on `:3000`), the browser considers these different origins. If you don't configure your `sameSite` and `secure` properties correctly, the browser will silently drop the cookie sent by the server.

**Fix:**
Modify how you generate your cookie in your auth controller. Provide the `sameSite: "lax"` option.

```js
// Incorrect (Browser will likely reject during Cross-Origin development)
res.cookie("isLoggedIn", true);

// Correct
res.cookie("isLoggedIn", "true", {
  maxAge: 1000 * 60 * 60 * 24,
  httpOnly: true,
  secure: false, // MUST be false for HTTP localhost
  sameSite: "lax", // Crucial for cross-origin localhost development to work!
});
```

---

## 6. How to Protect Routes with Middleware (`requireAuth`)

When building your Express backend, you will have routes that **anyone** can access (like `/login`, `/register`, or redirecting to a short link), and routes that **only logged-in users** should access (like creating a new short link, or viewing their dashboard).

To achieve this, we use the `requireAuth` middleware we created earlier.

### Why do we add `requireAuth` to each route?

In Express, middleware executes sequentially. When a user requests a route, Express runs the functions from left to right.

```js
import { requireAuth } from "../Middleware/auth.middleware.js";

// Example of a Protected Route
router.post("/", requireAuth, insertNewData);
```

**What happens here step-by-step:**

1. A user sends a `POST /` request to create a short link.
2. Because `requireAuth` is the second argument, Express **stops** and runs `requireAuth` _before_ running `insertNewData`.
3. Inside `requireAuth`, we check if the user has a valid `req.cookies.isLoggedIn`.
4. If they DO, `requireAuth` calls `next()`. This tells Express: _"The user is verified, continue to the `insertNewData` controller!"_
5. If they **DO NOT** have a valid cookie, `requireAuth` sends a `401 Unauthorized` response. Express immediately stops, and the `insertNewData` controller is **never executed**, keeping your application completely secure.

### Example Configuration

In a real application (like your `urlRoutes.routes.js`), you strategically place `requireAuth` only on the routes that manage data:

```javascript
import { Router } from "express";
import { requireAuth } from "../Middleware/auth.middleware.js";
import {
  getAvailabledata,
  redirectToURL,
  insertNewData,
  deleteUrl,
  updateUrl,
} from "../Controllers/urlController.js";

const router = Router();

// PROTECTED ROUTES (Need valid cookies)
// ------------------------------------
router.get("/urlshortner", requireAuth, getAvailabledata);
router.post("/", requireAuth, insertNewData);
router.put("/:id", requireAuth, updateUrl);
router.delete("/:id", requireAuth, deleteUrl);

// PUBLIC ROUTES (No cookies needed)
// ------------------------------------
// A random user clicking your short link should immediately be redirected,
// they do not need to be logged into your app first!
router.get("/:shortcode", redirectToURL);

export const shortnerRouter = router;
```

---

## 🔐 JWT Authentication Flow (Your Current Implementation)

This section explains how JWT works in this project and what each function does.

### 1. Registration (`postRegister` in `auth.controller.js`)

- Receives `name`, `email`, `password` from frontend.
- Checks if the user exists via `getUserByEmail(email)`.
- If user exists: returns `409` (already registered).
- If new user: hashes password with `hashPassword(password)` (argon2), saves with `saveUserdata(...)`.
- Does not issue token here; after register user should login.

### 2. Login (`postLogin` in `auth.controller.js`)

- Receives `email`, `password`.
- Finds user with `getUserByEmail(email)` and checks the first row.
- Compares password with `comparePassword(plaintext, db_hash)`.
  - Fallback: direct string comparison exists for backward compatibility if hashing fails.
- On success, calls `generateTocken({id, name, email})`.
- Sends JWT in cookie:

  - ```js
      res.cookie("access_tocken", token, 
      { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 30d })
      ```

- Response includes `{ success: true, user: { email }, redirectTo: "/"}`.

### 3. Token creation (`generateTocken` in `usersModel.model.js`)

- Input: `{ id, name, email }`.
- Validation: throws if `process.env.JWT_KEY` is missing.
- Calls `jwt.sign(payload, secret, { expiresIn: "30d" })`.
- Return: a signed JWT string.

### 4. Secure route guard (`requireAuth` in `auth.middleware.js`)

- Reads cookie: `req.cookies.access_tocken`.
- If no token: return `401 Unauthorized`.
- Verifies JWT using `jwt.verify(token, process.env.JWT_KEY)`.
- On valid token: sets `req.user = decoded` and calls `next()` to proceed to controller.
- On invalid/expired token: return `401 Invalid/Expired token`.

### 5. Current-user check (`getCurrentUser` in `auth.controller.js`)

- Reads cookie `req.cookies.access_tocken`.
- Validates token with `jwt.verify(...)`.
- Extracts user `id`, looks up DB with `getUserById({ id })`.
- Responds `{ loggedIn: true, user: {id,name,email} }` or `{ loggedIn: false }` when missing/invalid.

### 6. Logout (`logoutUser` in `auth.controller.js`)

- Clears JWT cookie `access_tocken` (and old cookies `isLoggedIn`, `userId` for compatibility).
- Responds with success JSON.

---

## 🧩 How this works end-to-end

1. User submits login form in React (`LoginPage.jsx`) to `/login` with `withCredentials: true`.
2. Backend validates credentials and responds with `Set-Cookie: access_tocken=<jwt>` (HTTP-only secure cookie).
3. Browser stores cookie and sends it automatically on same domain requests.
4. On protected routes (`/urlshortner`, `POST /`, `PUT /:id`, etc.), `requireAuth` checks token.
5. If token valid, request continues; controllers can use `req.user` for user-specific logic.
6. `Navbar` calls `/auth/me` with credentials; backend verifies token and returns user data.

---

## ✅ Notes and suggestions

- Cookie name currently: `access_tocken` (typo). Should ideally be `access_token` everywhere for clarity.
- You can keep legacy `isLoggedIn/userId` support for backward compatibility but prefer JWT flow.
- In production, always use `secure: true` + HTTPS.
- Protect `/logout` route also with `requireAuth` if desired (user should be logged in to log out cleanly).
- You can include the token in API responses for explicit auth flows, but with HttpOnly cookie it is handled by browser automatically.

---

## 🧾 JWT method reference (jsonwebtoken)

### `jwt.sign(payload, secretOrPrivateKey, [options])`

- Purpose: generate a JSON Web Token from a payload that can be verified later.
- Returns: signed JWT string, e.g., `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Common options:
  - `expiresIn`: token lifetime, e.g., `'30d'`, `'1h'`, `'15m'`.
  - `issuer`, `audience`, `subject` (standard JWT claims).
  - `algorithm`: default `HS256` (HMAC SHA-256) with secret key.

```js
import jwt from "jsonwebtoken";

const payload = { id: user.id, email: user.email, name: user.name };
const token = jwt.sign(payload, process.env.JWT_KEY, {
  expiresIn: "30d",
});
```

### `jwt.verify(token, secretOrPublicKey, [options])`

- Purpose: verify the token was signed by your secret and is not expired/tampered.
- Returns: decoded payload if valid (e.g., `{ id, name, email, iat, exp }`).
- Throws on failure:
  - `TokenExpiredError` (expired token)
  - `JsonWebTokenError` (invalid signature or malformed token)
  - `NotBeforeError` (token not active yet)

```js
try {
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  // token valid; decoded includes payload claims
} catch (error) {
  // invalid / expired
  console.error("JWT verify failed", error);
}
```

### `jwt.decode(token, [options])`

- Purpose: decode token payload without verifying signature (read-only, not secure). Use mainly for debugging.
- Example:

```js
const decoded = jwt.decode(token);
console.log(decoded); // { id: 123, email: "a@b.com", iat: 168..., exp: 171... }
```
> Note: in your project use `jwt.verify` for auth checks. `jwt.decode` should not replace secure verification.

---

## 🧩 JWT decoded object example (key/value explanation)

**Decoded form**:
```js
{
  id: 8,
  name: 'Jatin',
  email: 'Jatin@gmail.com',
  iat: 1773810266,
  exp: 1776402266
}
```

- `id`: application-specific user identifier. Typically used for DB lookups or `req.user.id` usage.
- `name`: user display name (custom claim, from signin payload).
- `email`: user email address (custom claim, from signin payload).
- `iat` (issued at): UNIX timestamp (seconds) when token was created.
- `exp` (expiration): UNIX timestamp (seconds) when token becomes invalid.

**In this example**: token lifespan is `exp - iat = 2592000` seconds → exactly 30 days.

