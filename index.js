const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/connection");
const adminRoute = require("./routes/adminRouter");
const projectRouter = require("./routes/projectRouter");
const companyRoutes = require("./routes/companyRoutes");
const employeeRouter = require("./routes/employeeRouter");
const logRouter = require("./routes/logRoutes");
const newsRouter = require("./routes/newsRouter");
const footerRouter = require("./routes/footerVideoRouter");
const partnerRouter = require("./routes/partnershipRouter");
const formRouter = require("./routes/formRouter");
const csvFileRouter = require("./routes/csvFileRouter");
const headingsForPartnerNews = require("./routes/headingForNewsPartnershipRouter");
const selectionRoutes = require("./routes/selectionRoutes");

const app = express();

dotenv.config({ path: "./.env" });
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
// Middleware
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));


app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies and authentication headers
    methods: '*', // Allow all HTTP methods
  })
);

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Creates 'uploads' folder if it doesn't exist
}

// Connect to database
connectDB();

// Routes
app.use("/api/projects", projectRouter);

app.use("/api/jobfair/companies", companyRoutes);

app.use("/api/employee", employeeRouter);
app.use("/api/news", newsRouter);
app.use("/api/footer", footerRouter);
app.use("/api/partner", partnerRouter);
app.use("/contactForm", formRouter);
app.use("/export", csvFileRouter);
app.use("/api/headingfornewspatnership", headingsForPartnerNews);
app.use("/api/selection", selectionRoutes);

app.use(logRouter);

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "uploads", "projects")));

// console.log(path.join(__dirname,"uploads","projects","1736697702064.pdf"));

app.use(adminRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is running @ http://localhost:${process.env.PORT}`);
});
