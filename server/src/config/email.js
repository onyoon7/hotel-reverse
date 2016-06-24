var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
export default {
  makedeal: (client_Email) => {
  var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
      auth: {
          user: "gooday2.luv@gmail.com",
          pass: "a1082926"
      }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: "호텔리버스 ✔ <admin@hotelreverse.com>", // sender address
      to: client_Email, // list of receivers
      subject: "고객님의 호텔 역경매가 신청되셨습니다. ✔", // Subject line
      text: "축하축하 ✔", // plaintext body
  }

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }

      // if you don't want to use this transport object anymore, uncomment following line
      //smtpTransport.close(); // shut down the connection pool, no more messages
  });
  }
}
