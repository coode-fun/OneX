const nodeMailer=require('../config/nodemailer');

exports.newVerification=(user)=>{
    console.log("INside mailer directory");

    nodeMailer.tranpoter.sendMail({
        from:'oneX.sas.2021@gmail.com',
        to:user.email,
        subject:"This is subject",
        html:`<h1>Yup, your comment has been publshed!!<h1> <br> <a href="http://onex-system.herokuapp.com/students/verify/${user.email}">CLICK TO ACTIVATE</a>`
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail :",err);
            return ;
        }
        console.log("Mail sent successfully sent !",info);
    })
}