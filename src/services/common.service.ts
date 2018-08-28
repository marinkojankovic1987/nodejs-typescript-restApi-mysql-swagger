import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
const config = require('../configs/config.json');


const createId = (letters) => {
    return letters + (new Date().valueOf()).toString();
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
            // console.log(jwt.verify(req.headers['authorization'], config.JWT_SECRET)['user']);
            req.user = jwt.verify(req.headers['authorization'], config.JWT_SECRET)['user'];
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

export { createId, createPassword, isJson, setValue, setAuth };