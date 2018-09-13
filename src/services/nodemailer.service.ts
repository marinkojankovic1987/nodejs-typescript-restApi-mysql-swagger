import { Service } from '../dependency-injections/decorators';
import * as nodemailer from 'nodemailer';
import { MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD } from '../configs/config';

@Service()
class NodeMailSevice {

    transporter: any;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            auth: {
                user: MAIL_USERNAME,
                pass: MAIL_PASSWORD
            }
        });
    }
    sendMail(to, subject, html) {
        const mailOptions = {
            from: MAIL_USERNAME, // sender address
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