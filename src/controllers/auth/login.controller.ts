import {Injector} from '../../dependency-injections/injector';
import QueryService from '../../services/querys.service';
import { getUserData } from '../../services/utils.service';
import {JWT_SECRET} from '../../configs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const querys = Injector.resolve<QueryService>(QueryService);


const login = (req, res) => {
    return querys.getSomeFieldsByField('users', ['user_name', 'password'], 'user_name', req.body.user_name)
        .then((result:any) => {
            if (result.length == 0) {
                res.status(404).json({
                    message: 'Wrong username'
                });
            }

            else {
                if (bcrypt.compareSync(req.body.password, result[0].password)) {
                    getUserData(req.body.user_name).then((user) => {
                        res.status(200).json({
                            token: jwt.sign({user}, JWT_SECRET, { expiresIn: 6 * 3600 })
                        });
                    }).catch((err) => {
                        res.status(404).json({
                            message: 'No user in system'

                        });
                    })
                }
                else {
                    res.status(401).json({
                        message: 'Wrong password!'
                    });
                }
            }

        })
        .catch((err) => {
            res.status(401).json({
                message: 'Wrong username or password!'
            });
        })
}

export { login }
