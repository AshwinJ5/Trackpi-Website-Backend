const Project = require('../models/projectSchema'); 


exports.submitProject = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the body data
    console.log("Uploaded file:", req.file); // Log the file

    if (!req.file) {
      return res.status(400).json({ error: "File upload is required" });
    }

    // Get the original filename from req.file
    const { originalname } = req.file;

    // Destructure the project data directly from req.body
    const {
      fullName,
      contactNumber,
      emailAddress,
      qualification,
      projectName,
      userType,
      problemSolved,
      beneficiaries,
      successReason,
      skills,
      summary,
      institute_company
    } = req.body;
    console.log(req.body,"request body");

    // Check if required fields are missing
    if (!fullName || !contactNumber || !emailAddress || !projectName || !problemSolved ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate fullName
    if (fullName.length < 3 || fullName.length > 64) {
      return res.status(400).json({ error: "Full name must be between 3 and 64 characters" });
    }

    // Validate contactNumber
    if (!/^\+\d{1,3}\s\d{7,12}$/.test(contactNumber)) {
      return res.status(400).json({
        error: "Phone number must include a valid country code (e.g., +91 9876543210) and be 7 to 12 digits long.",
      });
    }

    // Validate emailAddress
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailAddress)) {
      return res.status(400).json({ error: "Please enter a valid email address" });
    }

    // Handle file path
    const file_path = `/uploads/projects/${req.file.filename}`

    // Create a new project document
    const project = new Project({
      fullName,
      contactNumber,
      emailAddress,
      qualification,
      projectName,
      userType,
      problemSolved,
      beneficiaries,
      successReason,
      skills,
      summary,
      institute_company,
      file: file_path, // Full file path
      fileName: originalname, // Original filename
    });

    // Save the project to the database
    await project.save();

    // Return success response
    res.status(201).json({
      message: "Project submitted successfully",
      project,
    });
  } catch (error) {
    console.error("Error details:", error); // Log the full error
    res.status(500).json({
      error: "Failed to submit project",
      details: error.message,
    });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // Retrieve all projects
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error retrieving projects:', error.message);
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error retrieving project:', error.message);
    res.status(500).json({ error: 'Failed to retrieve project' });
  }
};
