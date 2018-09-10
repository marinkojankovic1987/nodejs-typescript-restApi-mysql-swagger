import { Injector } from '../../dependency-injections/injector';
import QueryService from '../../services/querys.service';
import { createPassword } from '../../services/common.service';
import { getUserById } from '../../services/utils.service';
import User from '../../models/user.model';

const querys = Injector.resolve<QueryService>(QueryService);


const getOne = (req, res, next) => {
    const id = req.params.id;
    getUserById(id).then((result: User) => {
        if (!result) {
            res.status(200).json(result);
            next();
        }
        res.status(200).json(result);
        next();

    }).catch((err) => {
        res.status(400).json({
            message: err
        });
    })
}

const list = (req, res) => {
    let fields, filter, terms_value, offset, limit;
    if (req.query['fields']) {
        fields = req.query['fields'];
        console.log(fields)
    }
    else {
        fields = '*';
    }
    if (req.query['filter']) {
        filter = JSON.parse(req.query['filter']);
    }
    else {
        filter = {};
    }

    if (req.query['offset']) {
        offset = req.query['offset'];
    }
    if (req.query['limit']) {
        limit = req.query['limit'];
    }
    querys.getSomeFieldsByMultiFields('users', [fields], filter, limit, offset).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(400).json({ 'message': err });
    })
}

const updateById = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    getUserById(id).then((result: User) => {
        let user: User = result;

        for (let key in body) {
            if (key !== 'id') {
                if(key == 'password'){
                    body[key] = createPassword(body[key]);
                }
                if (user[key] == body[key]) {
                    delete body[key];
                }
            }
        }
        body['updated'] = new Date();


        querys.updateData('users', body, id).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json({ 'message': err })
        })

    }).catch((err) => {
        res.status(400).json({
            message: err
        });
    })
}

const deleteById = (req, res, next) => {

    const id = req.params.id;

    let _user: any = {};
    _user.is_active = 0;
    _user.updated = new Date();

    querys.updateData('users', _user, id).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(400).json({ 'message': err })
    });
}

export { getOne, list, updateById, deleteById }
