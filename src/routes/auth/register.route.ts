import { Router } from 'express';
import * as validate from 'express-validation';
import validations from './validation/register';
import { register } from '../../controllers/auth/register.controller';


const registerRoute: Router = Router();

registerRoute.route('/')
    .post(validate(validations.postRegister), register);


export default () => {
    return registerRoute;
};