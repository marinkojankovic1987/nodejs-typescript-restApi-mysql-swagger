import { Injector } from '../../dependency-injections/injector';
import QueryService from '../../services/querys.service';
import User from '../../models/user'

const querys = Injector.resolve<QueryService>(QueryService);


const register = (req, res) => {

    let _user = new  User(
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
    res.status(201).json({ 'message': 'Succes add user' });
}).catch((err) => {
    res.status(400).json({ 'message': err })
})
}

export { register }