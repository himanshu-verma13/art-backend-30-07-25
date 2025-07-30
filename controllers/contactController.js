// controllers/contactController.js

const Contact = require("../models/contact");

exports.createContact = async (req, res) => {
  const { name, email, phone, subject, message, inquiryType } = req.body;
  try {
     await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      inquiryType,
    });
    res.status(201).json({ success: true, message: "Contact Us Form Submited Successfuly" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
