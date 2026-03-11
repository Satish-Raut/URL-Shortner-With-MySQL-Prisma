import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "This is Home Route at backend." });
});

app.post("/", (req, res) => {
  // console.log("Logged at Backend: ", req.body);
  res.json({ message: "Data received at Backend." });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
