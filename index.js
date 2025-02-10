const dotenv= require("dotenv");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/connection")
const adminRoute = require("./routes/adminRouter");
const projectRouter = require("./routes/projectRouter");
const employeeRouter = require("./routes/employeeRouter");
const logRouter = require("./routes/logRoutes")
const newsRouter = require("./routes/newsRouter");
const footerRouter = require("./routes/footerVideoRouter");
const partnerRouter = require("./routes/partnershipRouter");
const formRouter = require("./routes/formRouter");
const csvFileRouter = require("./routes/csvFileRouter");
const headingsForPartnerNews=require("./routes/headingForNewsPartnershipRouter")

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

// Connect to database
connectDB();

// Routes
app.use("/api/projects", projectRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/news", newsRouter);
app.use("/api/footer", footerRouter);
app.use("/api/partner", partnerRouter);
app.use("/contactForm", formRouter);
app.use("/export", csvFileRouter);
app.use("/api/headingfornewspatnership", headingsForPartnerNews);

app.use(logRouter)


// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/assets",express.static(path.join(__dirname,"uploads","projects",)));

// console.log(path.join(__dirname,"uploads","projects","1736697702064.pdf"));

app.use(adminRoute);

app.listen(process.env.PORT,()=>{
  console.log(`server is running @ http://localhost:${process.env.PORT}`)
})