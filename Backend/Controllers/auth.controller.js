import {
  comparePassword,
  getUserByEmail,
  getUserById,
  hashPassword,
  saveUserdata,
} from "../Models/usersModel.model.js";

// "Both the get page are handled by the Frontend"

// export const getRegisterPage = (req, res) => {
//   res.render("auth/register");
// };

// export const getLoginPage = (req, res) => {
//   res.render("auth/login");
// };

export const postLogin = async (req, res) => {
  // {1. Verify the data given by the user i.e already regesterd or not}
  const { email, password } = req.body;
  const [validUser] = await getUserByEmail({ email });

  console.log("Logged In Valid User:", validUser);

  // {2. If the user already registered then redirect to Home page}
  if (validUser) {
    // {3. Verify the password matches here before logging them in!}
    let isPasswordValid = false;
    try {
      isPasswordValid = await comparePassword(password, validUser.password);
    } catch (error) {
      // Fallback: If argon2 fails (e.g. "pchstr must contain a $ as first char"),
      // it means the database has an old plaintext password that wasn't hashed.
      if (validUser.password === password) {
        isPasswordValid = true;
      }
    }

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    //{4. Set the cookie only upon successful login}
    res.cookie("isLoggedIn", true); // Login Status
    res.cookie("userId", validUser.id); // To know which user logged In
    console.log("cookie is saved in the browser");

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      redirectTo: "/", // redirect to home page
      user: { email: email },
    });
  } else {
    //{4. Otherwise redirect them to registration page}
    // A 404 Not Found error tells the frontend the resource (user) doesn't exist
    return res.status(404).json({
      success: false,
      message: "Account not found. Please create an account.",
      redirectTo: "/register",
    });
  }
};

export const postRegister = async (req, res) => {
  // {1. Get the data from the user}
  const { name, email, password } = req.body;

  // {2. Verify the details and check that the already exist or not}
  const userExists = await getUserByEmail({ email });
  console.log("userExists", userExists);

  // {3. If the user already exist then redirect to Login page}
  if (userExists.length !== 0) {
    return res.status(409).json({
      success: false,
      message: "You have already registered.",
      redirectTo: "/login",
    });
  }

  // {4. If the user is not exist then store data in database}
  const hashedPassword = await hashPassword(password); // Before storing hash the password
  await saveUserdata({ name, email, password: hashedPassword });

  // Backend controls where the user goes after success
  res.status(200).json({
    success: true,
    message: "Registered successfully",
    redirectTo: "/login", // The backend "decides" the destination
    user: { email: req.body.email },
  });
};

export const getCurrentUser = async (req, res) => {
  try {
    const isLoggedIn = req.cookies.isLoggedIn;
    const userId = req.cookies.userId;

    if (isLoggedIn !== "true" || !userId) {
      return res.json({ loggedIn: false });
    }

    const [user] = await getUserById({ id: Number(userId) });

    if (!user) {
      return res.json({ loggedIn: false });
    }

    return res.json({
      loggedIn: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("isLoggedIn");
    res.clearCookie("userId");

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
