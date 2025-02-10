require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/connection");
const adminRoute = require("./routes/adminRouter");
const projectRouter = require("./routes/projectRouter");
const posterRoutes = require("./routes/posterRoutes");
const internRoute = require("./routes/internRouter");
const salesRoutes = require("./routes/salesRouter");
const companyRoutes = require("./routes/companyRoutes")

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Creates 'uploads' folder if it doesn't exist
}

// Connect to database
connectDB();
console.log("MongoDB URI:", process.env.CONNECTION_STRING);

// Routes
app.use("/api/projects", projectRouter);
app.use("/api/posters", posterRoutes);
app.use("/api/interns", internRoute);
app.use("/api/sales", salesRoutes);
app.use("/api/jonfair/companies", companyRoutes);

app.use(adminRoute);

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
