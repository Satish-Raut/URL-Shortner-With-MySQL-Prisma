export const getRegisterPage = (req, res) => {
  res.render("auth/register");
};

export const getLoginPage = (req, res) => {
  res.render("auth/login");
};

export const postLogin = (req, res) => {
  // {1. Manual method}
  // res.setHeader("Set-Cookie", "isLoggedIn=true; path=/;");

  // {2. Using Cookie Parser}
  res.cookie("isLoggedIn", true)

  // Backend controls where the user goes after success
  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    redirectTo: "/", // The backend "decides" the destination
    user: { email: req.body.email },
  });
};

export const postRegister = (req, res) => {
  // Backend controls where the user goes after success
  res.status(200).json({
    success: true,
    message: "Registered successfully",
    redirectTo: "/login", // The backend "decides" the destination
    user: { email: req.body.email },
  });
};
