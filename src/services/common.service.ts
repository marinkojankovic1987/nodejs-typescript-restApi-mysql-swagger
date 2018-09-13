import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import {JWT_SECRET} from '../configs/config';

const createId = (letters) => {
    return letters + (new Date().valueOf()).toString();
}

const createHash = () => {
    return crypto.createHash('sha1').update((new Date()).valueOf().toString() +  Math.random().toString()).digest('hex');
}

const createPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
const setValue = (value) => {

    if (typeof value == 'string') {
        return JSON.parse(value);
    } else {
        return value;
    }
}

const setAuth = (req, res, next) => {

    if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {
            req.user = jwt.verify(req.headers['authorization'], JWT_SECRET)['user'];
        } catch (err) {
            /*
             * If the authorization header is corrupted, it throws exception
             * So return 401 status code with JSON error message
             */
            return res.status(401).json({
                    message: 'Failed to authenticate token!'
            });
        }
    } else {
        /*
         * If there is no autorization header, return 401 status code with JSON
         * error message
         */
        return res.status(401).json({
            message:'No token!'
        });
    }
    next();
    return;
}

export { createId, createPassword, isJson, setValue, setAuth, createHash };