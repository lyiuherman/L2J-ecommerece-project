const nodemailer=require('nodemailer')

const transpoter=  nodemailer.createTransport({
    service:'gmail',
    host: "Leeronsajesh123@gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:process.env.MAIL_ID,
        pass:process.env.MAILPASSWORD
    }
})

module.exports=transpoter