const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields' });
  }
  
  try {
    // Create a test account if no email config is provided
    let testAccount = await nodemailer.createTestAccount();
    
    // Create transporter
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true' || false,
      auth: {
        user: process.env.EMAIL_USER || testAccount.user,
        pass: process.env.EMAIL_PASS || testAccount.pass,
      },
    });
    
    // Send email
    let info = await transporter.sendMail({
      from: `"Website Contact" <${email}>`,
      to: process.env.EMAIL_TO || 'bora.esen@outlook.com.tr',
      subject: `Website Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    
    console.log('Message sent: %s', info.messageId);
    
    // For test accounts, show the URL where the message can be viewed
    if (!process.env.EMAIL_HOST) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!',
      previewUrl: process.env.EMAIL_HOST ? null : nodemailer.getTestMessageUrl(info)
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
