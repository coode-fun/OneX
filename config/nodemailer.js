
var nodemailer = require('nodemailer');
const path=require('path');


let transpoter=nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
  auth: {
    user: 'onex.sas.2021@gmail.com',
    pass: 'Miniproject@123'
  }
})

let renderTemplate=(data,relativepath)=>{
    let mailHTML;

    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativepath),
        data,
        function(err,template){
            if(err){console.log("Error from mailing");return ;}
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    tranpoter:transpoter,
    renderTemplate:renderTemplate
}
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'youremail@gmail.com',
//     pass: 'yourpassword'
//   }
// });

// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });