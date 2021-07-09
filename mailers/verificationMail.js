const nodeMailer=require('../config/nodemailer');

exports.newVerification=(email, token)=>{
    console.log("INside mailer directory");

    nodeMailer.tranpoter.sendMail({
        from:'oneX.sas.2021@gmail.com',
        to:email,
        subject:"This is subject",
        html:`<h1>Yup, You have been sucessfully registered.!!<h1> <br> <a href="http://onex-system.herokuapp.com/students/verify/${token}">CLICK TO ACTIVATE</a>`
        //    html:`<h1>Yup, your comment has been publshed!!<h1> <br> <a href="http://localhost:5000/students/verify/${token}">CLICK TO ACTIVATE</a>`
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail :",err);
            return ;
        }
        console.log("Mail sent successfully sent !",info);
    })
}
exports.resetPasswordMail = (email, token) => {

    let config = {
        to: email,
        from: 'oneX.sas.2021@gmail.com',
        subject: 'Password reset request',
        html: `<h1>Hi,<h1> <br> <a href="http://onex-system.herokuapp.com/students/setNewPassword?token=${token}">Click to reset password!</a> `// UPDATE THE URL AS OF THE CORRECT ROUTE TO THE ENTER NEW PASSWORD WINDOW, LEAVE ---> '?token=${token}' <--- THIS AS IT IS.
        // html:`<h1>Yup, your request has been received, valid for  24 hours!!<h1> <br> <a href="http://localhost:5000/students/setNewPassword?token=${token}">Click to reset password!</a>`
        
    }

    nodeMailer.tranpoter.sendMail( config , (err,info) =>{
        if(err){
            console.log("Error in sending mail :",err);
            return ;
        }
        console.log("Mail sent successfully sent !",info);
    })
}
