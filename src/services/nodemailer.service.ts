import { Service } from '../dependency-injections/decorators';
import * as nodemailer from 'nodemailer';


@Service()
class NodeMailSevice {

    transporter: any;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'marinkotest1987@gmail.com',
                pass: '#test1987'
            }
        });
    }
    sendMail(to, subject, html) {
        const mailOptions = {
            from: 'marinkotest1987@gmail.com', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: html// plain text body
        };
        this.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return err;
            } else {
                console.log(info);
                return info;
            }
        });
    }
}

export default NodeMailSevice;