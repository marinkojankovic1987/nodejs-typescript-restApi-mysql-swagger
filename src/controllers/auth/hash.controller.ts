import { Injector } from '../../dependency-injections/injector';
import QueryService from '../../services/querys.service';
import NodeMailerService from '../../services/nodemailer.service';
import Hash from '../../models/hash2params.model';
import * as bcrypt from 'bcrypt';
const config = require('../../configs/config.json');

const querys = Injector.resolve<QueryService>(QueryService);
const nodeMailer = Injector.resolve<NodeMailerService>(NodeMailerService);


const storeToHashTable = (req, res) => {

    const email = req.body.email;
    querys.customQuery(
        'select user_name ' +
        'from users ' +
        'where user_name="' + email + '"'
    ).then((result: any) => {
        console.log(result);
        if (result.length == 0) {
            res.status(404).json({
                message: 'User not exist in our system'

            });
        }
        else {
            return insertToTable(res, result[0]['user_name'])
        }

    }).catch((err) => {
        res.status(400).json({
            message: 'Unexpected error'

        });
    })

}

function insertToTable(res, email) {
    let _hash = new Hash(
        true,
        3600,
        JSON.stringify({
            email: email
        })
    );

    querys.insertData('hash_2_params', _hash).then((result) => {
        nodeMailer.sendMail('banjacm82@gmail.com', 'Forgot password:Vindex', '<p>If you want to reset yor password click <a>here<a/></p>');
        res.status(201).json({ 'message': 'Succes add hash' });

    }).catch((err) => {
        res.status(400).json({ 'message': err })
    })
}

export { storeToHashTable }
