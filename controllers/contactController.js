import sendMail from "../middeleware/sendMail.js";
import nodemailer from "nodemailer";
import ContactMessage from "../models/ContactMessage.js";
import axios from "axios";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message, captcha } = req.body;
    

    if (!name || !email || !message || !captcha) {console.log(req.body)
      return res.status(400).json({ success: false, message: "All required fields + captcha must be provided" });
    }


    const captchaVerify = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${captcha}`
    );

    if (!captchaVerify.data.success) {
      return res.status(400).json({ success: false, message: "Captcha verification failed" });
    }

    const newMessage = await ContactMessage.create({ name, email, phone, message });


     // Send  Email Admin
  
    const mailmessageadmin =`
    <h3>New Contact Inquiry</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "N/A"}</p>
    <p><strong>Message:</strong> ${message}</p> `


    await sendMail(process.env.SMTP_USER,`"Contact Form" <${process.env.SMTP_USER}>`, 'New Contact Inquiry', mailmessageadmin);

// Send  Email User
  
    const mailmessage =`
    <p>Hi ${name},</p>
    <p>Thank you for contacting Paradisepeak Travels.
    <br /> We received your message:</p>
    <blockquote>${message}</blockquote>
    <p>Our team will get back to you shortly.</p>
    <p>Best Regards,<br/>Paradisepeak Travels Team</p> `

    await sendMail(email,`"Paradisepeak Travels" <${process.env.SMTP_USER}>`, 'We received your inquiry', mailmessage);

    res.status(201).json({
      success: true,
      message: "Your inquiry has been received. Our team will contact you shortly.",
      contactMessage: newMessage
    });
  } catch (error) {
    console.error("Error in /contact:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
