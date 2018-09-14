import { Injector } from '../../dependency-injections/injector';
import QueryService from '../../services/querys.service';
import NodeMailerService from '../../services/nodemailer.service';
import TemplateService from '../../services/template.service';
import { createPassword } from '../../services/common.service';
import Hash from '../../models/hash2params.model';


const querys = Injector.resolve<QueryService>(QueryService);
const nodeMailer = Injector.resolve<NodeMailerService>(NodeMailerService);
const templates = Injector.resolve<TemplateService>(TemplateService);


const storeToHashTable = (req, res) => {

    const email = req.body.email;
    const expired = req.body.email;

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
            return insertToHashTableAndSendMail(res, result[0]['user_name'], expired, 'forgot');
        }
    }).catch((err) => {
        res.status(400).json({
            message: 'Unexpected error'
        });
    })
}

const getDataFromHashTable = (req, res) => {
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
                updateHashTable(res, foundedHash.id, dataFromHash.email, false, true)
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
            if (dataFromHash.hasOwnProperty("canUse") && !dataFromHash.canUse) {
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
                    // res.status(200).json({
                    //     message: 'Password changed'
                    // });
                    updateHashTable(res, foundedHash.id, dataFromHash.email, false, false);
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

const insertToHashTableAndSendMail = (res, email, expired, template) => {
    let _hash = new Hash(
        expired,
        3600,
        JSON.stringify({
            email: email
        })
    );

    querys.insertData('hash_2_params', _hash).then((result) => {
        nodeMailer.sendMail(email, templates.getTitle(template), templates.getTemplate(template, _hash.hash));
        res.status(201).json({ 'message': 'Go to mail' });

    }).catch((err) => {
        res.status(400).json({ 'message': err })
    })
}

const activateUser = (req, res) => {
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
            if (dataFromHash.hasOwnProperty("canUse") && !dataFromHash.canUse) {
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
                querys.updateData('users', { is_active: true }, id_user).then((result) => {
                    // res.status(200).json({
                    //     message: 'Ok'
                    // });
                    updateHashTable(res, foundedHash.id, dataFromHash.email, false, false);
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

function updateHashTable(res, id, email, isValid, canUse) {
    let dataForUpdate: any = {};
    dataForUpdate.email = email;
    dataForUpdate.isValid = isValid;
    dataForUpdate.canUse = canUse;

    querys.updateData('hash_2_params', { data: JSON.stringify(dataForUpdate) }, id).then((result) => {
        res.status(200).json({
            message: 'Ok'
        });
    }).catch((err) => {
        res.status(400).json({ 'message': err })
    })
}


export { storeToHashTable, getDataFromHashTable, changePasswordByHash, insertToHashTableAndSendMail, activateUser }
