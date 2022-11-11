
// let nodemailer = require('nodemailer')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aswinak799@gmail.com',
    pass: 'jukbrxhctyezminm'
  }
});

// var mailOptions = {
//   from: 'aswinak799@gmail.com',
//   to: 'alenchristy0201@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'Hai how are you man!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

module.exports = transporter;


