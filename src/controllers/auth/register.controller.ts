import { Injector } from '../../dependency-injections/injector';
import QueryService from '../../services/querys.service';
import { insertToHashTableAndSendMail } from './hash.controller';
import User from '../../models/user.model'

const querys = Injector.resolve<QueryService>(QueryService);


const register = (req, res) => {
    let _user = new User(
        req.body.user_name,
        req.body.password,
        req.body.first_name,
        req.body.last_name,
        req.body.last_name,
        req.body.date_of_birth,
        req.body.gender,
        req.body.phone,
        req.body.role,
        req.body.city,
        req.body.country
    );

    querys.insertData('users', _user).then((result) => {
        insertToHashTableAndSendMail(res, _user.user_name, false,'register');
    }).catch((err) => {
        res.status(400).json({ 'message': err })
    })
}



export { register }