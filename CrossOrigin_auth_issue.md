# Documentation: Resolving Cross-Origin Authentication Issues

This document explains the common "Login Issue" that occurs when deploying a Full-Stack application where the Frontend and Backend are hosted on different domains (e.g., Vercel and Render).

## 1. The Core Problem: Third-Party Cookie Blocking

When your frontend is at `https://frontend.vercel.app` and your backend is at `https://backend.onrender.com`, the browser treats them as **different sites**.

### What happens?
1.  **CORS (Cross-Origin Resource Sharing)**: The browser blocks requests if the Backend doesn't explicitly allow the Frontend-Origin.
2.  **Third-Party Cookies**: When the Backend tries to set a cookie (`res.cookie`), the browser sees it as a "Third-Party" cookie because it's coming from a domain different from the one in the address bar.
3.  **Privacy Protection**: Modern browsers (Chrome, Safari, Brave) block these third-party cookies by default to protect user privacy.

---

## 2. Troubleshooting Steps

### A. CORS Origin Mismatch
**Issue**: Even a single `/` at the end of a URL can cause CORS to fail.
- **Example**: `https://my-app.vercel.app/` (with slash) does **not** match `https://my-app.vercel.app` (without slash).
- **Solution**: We added logic to automatically remove trailing slashes from the `FRONTEND_URL` environment variable.

### B. Secure Cookie Settings
**Issue**: Cookies won't be sent over HTTPS unless marked as `secure: true` and `sameSite: "none"`.
- **Logic**: For local development (`localhost`), we use `secure: false` and `sameSite: "lax"`. For production (HTTPS), we switch to `secure: true` and `sameSite: "none"`.

### D. Logout Issues (Sticky Session)
**Issue**: When logging out, the cookie is not cleared if the `res.clearCookie` attributes don't match the attributes used when the cookie was set.
- **Solution**: We updated `res.clearCookie` to explicitly include `httpOnly: true`, `secure: true`, and `sameSite: "none"` in production.

### C. Proxy Issues (Render/Vercel)
**Issue**: Express might not know it is running behind a secure proxy (Load Balancer), so it thinks the request is insecure and refuses to set a "secure" cookie.
- **Solution**: `app.set("trust proxy", 1);` tells Express to trust the headers sent by Render/Vercel's proxy.

### D. Frontend Routing 404 (Logout Bug)
**Issue**: Navigation to `/logout` fails with a 404 error if the route is not defined in React Router.
- **Problem**: In the mobile view, the logout button was using a `<Link to="/logout">`, but there was no corresponding route in `App.jsx`.
- **Solution**: Replaced the link with a `<button>` that triggers the `handleLogOut` function. **Logout should always be an action** (API call + State update) rather than a **navigation** to a non-existent route.

---

## 3. The Ultimate Solution: Same-Site Proxying (vercel.json)

Instead of fighting third-party cookie blocks, we used a **Vercel Proxy** to make the browser think the Backend is on the same domain as the Frontend.

### How it works:
1.  We created a `vercel.json` file in the Frontend:
    ```json
    {
      "rewrites": [
        {
          "source": "/api/:path*",
          "destination": "https://url-shortne-backend-1xi9.onrender.com/:path*"
        }
      ]
    }
    ```
2.  Now, the frontend calls `/api/login` instead of `https://render.com/login`.
3.  **The Magic**: Since `/api/login` is on the same domain as the website, the browser treats it as a **First-Party** cookie. This bypasses all third-party blocking and makes authentication 100% reliable.

## 4. The Fail-Safe Solution: Bearer Tokens (Authorization Header)

If cookies still fail due to cross-domain browser restrictions, switching to **Bearer Tokens** is the 100% reliable alternative.

### How it works:
1.  **Backend**: Returns the JWT token in the JSON response body upon login.
2.  **Frontend**: Stores the token in `localStorage.setItem("token", token)`.
3.  **Authentication**: All protected frontend requests include the `Authorization` header:
    ```javascript
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    ```
4.  **Backend**: The `getCurrentUser` middleware checks both the `Authorization` header and cookies to verify the user.

This bypasses all cookie-related restrictions and works perfectly across different domains.

| Component | Responsibility |
| :--- | :--- |
| **Backend (app.js)** | Allow the Frontend origin and enable `trust proxy`. |
| **Backend (Controller)** | Hash passwords strictly; issue JWT tokens in secure cookies. |
| **Frontend (vercel.json)** | Map all `/api` requests to the remote Render server. |
| **Frontend (.env)** | Use `/api` as the base URL to trigger the proxy. |
| **Frontend (Vite Config)** | Add a local proxy to ensure `npm run dev` still works locally. |

## 5. Lessons Learned
- Always check if cookies are being stored in `DevTools -> Application -> Cookies`.
- Always check the `Origin` header in the Backend logs.
- When domains are different, **Proxying** is usually better than trying to force cross-site cookies.
