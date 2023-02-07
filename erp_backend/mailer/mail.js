const nodemailer = require("nodemailer");


var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendMail(recipient, subject, body) {
  console.log("recipient>>>>>>>>>", recipient);
  const mailOptions = {
    from: "sheersh@mailinator.com",
    to: recipient,
    subject: subject,
    text: body,
    cc: "sheersh@mailinator.com"
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });

}

module.exports = {
  sendMail,
};

// const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: process.env.EMAIL,
//       pass: process.env.WORD,
//       clientId: process.env.OAUTH_CLIENTID,
//       clientSecret: process.env.OAUTH_CLIENT_SECRET,
//       refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//     },
//    });

//    transporter.verify((err, success) => {
//     err
//       ? console.log(err)
//       : console.log(`=== Server is ready to take messages: ${success} ===`);
//    });
   


//    let sendMail = ({sendTo, subject, body, cc} ) => {
//     let mailOptions = {
//       from: "sheersh@gmail.com",
//       to:sendTo,
//       subject: subject,
//       text: body,
//       cc: cc
//      };

//      transporter.sendMail(mailOptions, function (err, data) {
//       if (err) {
//         console.log("Error " + err);
//       } else {
//         console.log("Email sent successfully");
//       }
//      });
//    }
   
   
//    module.exports=sendMail