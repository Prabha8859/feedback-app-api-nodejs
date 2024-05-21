const nodemailer = require("nodemailer");
const { responder } = require("../responder/responder");

const sendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  console.log("Request = ",req.body);

  const info = await transporter.sendMail({
    from: {
      name: "Feedback System",
      address: process.env.USER,
    },
    to: `${req.body.email}`, // list of receivers
    subject: "Request from Feedback System", // Subject line
    text: "Dear user, \n You have new request from Feedback System.\n", // plain text body
    html: `<a href=${req.body.emailUrl} >${req.body.emailUrl}</a>`, // html body
  });
  if (info?.messageId) {
    responder(res, 5000, {});
  } else {
    res.status(400).json(error);
  }
};

module.exports = sendEmail;
