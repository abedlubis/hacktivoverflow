var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
var salt = bcrypt.genSaltSync(6);
var nodemailer = require('nodemailer');

module.exports = {
    hash : function(pass){
        return bcrypt.hashSync(pass, salt);
    },
    compare : function(pass, hashPass){
        return bcrypt.compareSync(pass, hashPass); 
    },
    sign : function(params){
        return jwt.sign(params, process.env.JWT_SECRET);
    },
    verify: function(token){
        return jwt.verify(token, process.env.JWT_SECRET)
    },
    nodemailer : function(params, done){
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.userNodemailer,
            pass: process.env.passNodemailer
        }
        });
    
        var mailOptions = {
        from: process.env.userNodemailer,
        to: params.data.recipient,
        subject: `Welcome ${params.data.name}, HacktivOverflow Message`,
        text: 'Thank you for join HacktivOverflow'
        };
    
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            done()
        }
        });
    }
}