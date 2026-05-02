require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./core/db");
const userRoutes = require("./modules/user/user.routes");
const taskRoutes = require("./modules/tasks/task.routes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);


connectDB();


app.get("/", (req, res) => {
  res.send("Server is live");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});