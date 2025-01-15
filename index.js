const dotenv= require("dotenv");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/connection")
const adminRoute = require("./routes/adminRouter");
const projectRouter = require("./routes/projectRouter");
const posterRoutes = require("./routes/posterRoutes");
const internRoute = require("./routes/internRouter");
const salesRoutes = require("./routes/salesRouter");
const newsRouter = require("./routes/newsRouter");
const footerRouter = require("./routes/footerVideoRouter");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
dotenv.config({path:'./.env'})
// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Creates 'uploads' folder if it doesn't exist
}

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(uploadDir));


// Connect to database
connectDB();
console.log("MongoDB URI:", process.env.CONNECTION_STRING);

// Routes
app.use("/api/projects", projectRouter);
app.use("/api/posters", posterRoutes);
app.use("/api/interns", internRoute);
app.use("/api/sales", salesRoutes);
app.use("/api/news", newsRouter);
app.use("/api/footer", footerRouter);

app.use(adminRoute);

app.listen(3001,()=>{
  console.log("server is running @ http://localhost:3001")
})