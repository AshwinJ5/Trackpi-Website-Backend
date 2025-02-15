const FooterVideo = require("../models/footerVideoSchema");

exports.createFooterVideo = async (req, res) => {
  try {
    const existingDocument = await FooterVideo.findOne();
    if (existingDocument) {
      return res.status(400).json({
        message:
          "A footer video configuration already exists. Please update it instead.",
      });
    }

    const { videourl1, videourl2, videourl3, videoheading, imageheading } =
      req.body;

    const videofile1 = req.files
      ? `/uploads/footer/${req.files.videofile1[0].filename}`
      : null;
    const videofile2 = req.files
      ? `/uploads/footer/${req.files.videofile2[0].filename}`
      : null;
    const videofile3 = req.files
      ? `/uploads/footer/${req.files.videofile3[0].filename}`
      : null;
    const imagefile = req.files
      ? `/uploads/footer/${req.files.imagefile[0].filename}`
      : null;

    const newFooterVideo = new FooterVideo({
      videofile1,
      videourl1,
      videofile2,
      videourl2,
      videofile3,
      videourl3,
      videoheading,
      imagefile,
      imageheading,
    });

    await newFooterVideo.save();

    res.status(201).json({
      message: "Footer video configuration created successfully",
      footerVideo: newFooterVideo,
    });
  } catch (err) {
    console.error("Error creating footer video configuration:", err.message);
    if (err.code === 11000) {
      return res.status(400).json({
        error:
          "A footer video configuration already exists. Please update it instead.",
      });
    }
    res.status(500).json({
      error: "An error occurred while creating the footer video configuration",
    });
  }
};

exports.updateFooterVideo = async (req, res) => {
  try {
    const existingDocument = await FooterVideo.findOne();
    if (!existingDocument) {
      return res.status(404).json({
        message:
          "Footer video configuration not found. Please create one first.",
      });
    }

    const { videourl1, videourl2, videourl3, videoheading, imageheading } =
      req.body;

    const videofile1 = req.files?.videofile1
      ? `/uploads/footer/${req.files.videofile1[0].filename}`
      : existingDocument.videofile1;
    const videofile2 = req.files?.videofile2
      ? `/uploads/footer/${req.files.videofile2[0].filename}`
      : existingDocument.videofile2;
    const videofile3 = req.files?.videofile3
      ? `/uploads/footer/${req.files.videofile3[0].filename}`
      : existingDocument.videofile3;
    const imagefile = req.files?.imagefile
      ? `/uploads/footer/${req.files.imagefile[0].filename}`
      : existingDocument.imagefile;
    console.log(existingDocument, "ssssss", videofile1);
    const noChanges =
      videofile1 === undefined ||
      (existingDocument.videofile1 && videourl1 === undefined) ||
      (existingDocument.videourl1 && videofile2 === undefined) ||
      (existingDocument.videofile2 && videourl2 === undefined) ||
      (existingDocument.videourl2 && videofile3 === undefined) ||
      (existingDocument.videofile3 && videourl3 === undefined) ||
      (existingDocument.videourl3 && videoheading === undefined) ||
      (existingDocument.videoheading && imagefile === undefined) ||
      (existingDocument.imagefile && imageheading === undefined) ||
      existingDocument.imageheading;

    /*   if (noChanges) {
      return res.status(304).send();
    } */

    existingDocument.videofile1 = videofile1;
    existingDocument.videourl1 = videourl1 || existingDocument.videourl1;
    existingDocument.videofile2 = videofile2;
    existingDocument.videourl2 = videourl2 || existingDocument.videourl2;
    existingDocument.videofile3 = videofile3;
    existingDocument.videourl3 = videourl3 || existingDocument.videourl3;
    existingDocument.videoheading =
      videoheading || existingDocument.videoheading;
    existingDocument.imagefile = imagefile;
    existingDocument.imageheading =
      imageheading || existingDocument.imageheading;

    await existingDocument.save();

    res.status(200).json({
      message: "Footer video configuration updated successfully",
      footerVideo: existingDocument,
    });
  } catch (err) {
    console.error("Error updating footer video configuration:", err.message);
    res.status(500).json({
      error: "An error occurred while updating the footer video configuration",
    });
  }
};

exports.getAllFooterData = async (req, res) => {
  try {
    const footerVideos = await FooterVideo.find();
    res.status(200).json(footerVideos);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving footer", error });
  }
};
