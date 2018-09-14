import { Router } from 'express';
import * as validate from 'express-validation';
import validations from './validation/register';
import { register } from '../../controllers/auth/register.controller';
import { activateUser } from '../../controllers/auth/hash.controller';

const registerRoute: Router = Router();


registerRoute
    .get('/:hash', activateUser)
    .post('/', validate(validations.postRegister), register)


export default () => {
    return registerRoute;
};