const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer");
const upload = require("../middlewares/multer");
const employeeController = require("../controllers/employeeController");
const verifyJwt = require("../middlewares/jwtMiddleware");

// Route to get all employees
router.get("/employees", employeeController.getAllEmployees);

// Route to add an employee
router.post(
    "/employees",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "profileImage", maxCount: 1 },
        { name: "businessCard", maxCount: 1 },
        { name: "Certificate", maxCount: 1 },
    ]),
    verifyJwt,
    employeeController.addEmployee
);

// Route to update an employee by ID
router.put(
    "/employees/:id",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "profileImage", maxCount: 1 },
        { name: "businessCard", maxCount: 1 },
        { name: "Certificate", maxCount: 1 },
    ]),
    verifyJwt,
    employeeController.updateEmployeeById
);

// Route to delete an employee by ID
router.delete("/employees/:id", verifyJwt, employeeController.deleteEmployeeById);

// Route to get  an employee detail by Employee ID
router.get("/employeedetail/:id", employeeController.getAEmployeeDetail);

module.exports = router;
