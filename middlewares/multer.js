const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;
    console.log(req.baseUrl,"baseurl");
    if (req.baseUrl.includes("projects")) {
      folder = "uploads/projects";
    } else if (req.baseUrl.includes("videos")) {
      folder = "uploads/videos";
    } else if (req.baseUrl.includes("images")) {
      folder = "uploads/images";
    } else if (req.baseUrl.includes("partner")) {
      folder = "uploads/partner";
    } else if (req.baseUrl.includes("posters")) {
      folder = "uploads/posters";
    }else if (req.baseUrl.includes("employee")) {
      folder = "uploads/employees";
    } else if (req.baseUrl.includes("news")) {
      folder = "uploads/news";
    } else if (req.baseUrl.includes("footer")) {
      folder = "uploads/footer";
    }else {

      folder = "uploads/";
    }

    // Create folder if it doesn't exist
    const fullPath = path.join(__dirname, "..", folder);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    var allowedTypes = /jpeg|jpg|png|pdf|mp3|mp4|avi/; 
    if (req.baseUrl.includes("employee")) {
      allowedTypes = /jpeg|jpg|png|pdf/; // Only images and PDFs for employees
    }
    
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images, PDFs, and video files are allowed"));
  },
});

module.exports = upload;
