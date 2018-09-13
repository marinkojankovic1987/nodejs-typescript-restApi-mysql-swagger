import { Injector } from '../../dependency-injections/injector';
import QueryService from '../../services/querys.service';
import NodeMailerService from '../../services/nodemailer.service';
import { createPassword } from '../../services/common.service';
import Hash from '../../models/hash2params.model';


const querys = Injector.resolve<QueryService>(QueryService);
const nodeMailer = Injector.resolve<NodeMailerService>(NodeMailerService);


const storeToHashTable = (req, res) => {

    const email = req.body.email;
    querys.customQuery(
        'select user_name ' +
        'from users ' +
        'where user_name="' + email + '"'
    ).then((result: any) => {
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

const getFromHashTable = (req, res) => {
    const hash = req.params.hash;
    querys.customQuery(
        'select * from hash_2_params ' +
        'where hash="' + hash + '"'
    ).then((result: any) => {
        console.log(result);
        if (result.length == 0) {
            res.status(404).json({
                message: 'Hash not exist in our system'
            });
        }
        else {
            let foundedHash = result[0];
            let dataFromHash = JSON.parse(foundedHash.data);
            if (dataFromHash.hasOwnProperty("isValid")) {
                res.status(400).json({
                    message: 'This Sesion is expired'
                });
            }
            let createdDate = new Date(foundedHash.created);
            let expareDate = new Date(createdDate.setSeconds(foundedHash.time_to_live));

            if (expareDate < new Date()) {
                res.status(400).json({
                    message: 'This Sesion is expired'
                });
            }

            if (foundedHash.expire_after_first_access) {
                let dataForUpdate: any = {};
                dataForUpdate.email = dataFromHash.email;
                dataForUpdate.isValid = false;

                querys.updateData('hash_2_params', { data: JSON.stringify(dataForUpdate) }, foundedHash.id).then((result) => {
                    res.status(200).json({
                        message: 'Ok'
                    });
                }).catch((err) => {
                    res.status(400).json({ 'message': err })
                })

            } else {
                res.status(200).json({
                    message: 'Ok'
                });
            }
        }

    }).catch((err) => {
        res.status(400).json({
            message: 'Unexpected error'

        });
    })
}

const changePasswordByHash = (req, res) => {
    const hash = req.params.hash;
    querys.customQuery(
        'select * from hash_2_params ' +
        'where hash="' + hash + '"'
    ).then((result: any) => {
        console.log(result);
        if (result.length == 0) {
            res.status(404).json({
                message: 'Hash not exist in our system'
            });
        }
        else {
            let foundedHash = result[0];
            let dataFromHash = JSON.parse(foundedHash.data);
            if (dataFromHash.hasOwnProperty("isValid")) {
                res.status(400).json({
                    message: 'This Sesion is expired'
                });
            }
            querys.customQuery(
                'select id ' +
                'from users ' +
                'where user_name="' + dataFromHash.email + '"'
            ).then((result) => {
                let id_user = result[0].id;
                querys.updateData('users', { password: createPassword(req.body.password) }, id_user).then((result) => {
                    res.status(200).json({
                        message: 'Password changed'
                    });
                }).catch((err) => {
                    res.status(400).json({ 'message': err })
                })
            }).catch((err) => {
                res.status(400).json({ 'message': err })
            })
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
        nodeMailer.sendMail(email, 'Forgot password:Vindex', '<p>If you want to reset yor password click <a>here<a/></p>');
        res.status(201).json({ 'message': 'Succes add hash' });

    }).catch((err) => {
        res.status(400).json({ 'message': err })
    })
}

export { storeToHashTable, getFromHashTable, changePasswordByHash }
