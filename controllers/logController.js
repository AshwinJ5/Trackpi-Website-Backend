const logSchema = require("../models/logSchema")


exports.logRequestDetails = async (req, res, next) => {
    try {
      const newLog = new logSchema({
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        method: req.method,
        url: req.originalUrl,
        headers: {
          referer: req.headers['referer'] || 'N/A',
          host: req.headers['host'],
          contentType: req.headers['content-type'] || 'N/A'
        }
      });
      await newLog.save();
    } catch (err) {
      console.error('Error saving log:', err);
    }
    next();
  };
  
