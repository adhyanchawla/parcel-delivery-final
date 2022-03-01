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
  auth: {
    user: "co18327@ccet.ac.in",
    pass: "police5022",
  },
});

module.exports = transporter;
