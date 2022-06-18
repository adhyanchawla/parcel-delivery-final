const nodemailer = require("nodemailer");

// Cannot use the following configuration due to the Sender Authentication Problem.
// const sendGridTransport = require('nodemailer-sendgrid-transport');
// const transporter = nodemailer.createTransport(sendGridTransport({
//     auth: {
//         api_key: 'Generated-API-key-goes-here'
//     }
// }));

// Instead for testing purpose using Gmail Account.
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  
  auth: {
    user: "adhyanchawla06@gmail.com",
    pass: "ffnzinvqaunyxosu",
  },
});


module.exports = transporter;
