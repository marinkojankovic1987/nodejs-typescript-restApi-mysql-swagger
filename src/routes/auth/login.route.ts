import { Router } from 'express';
import * as validate from 'express-validation';
import validations from './validation/login';
import { login } from '../../controllers/auth/login.controller';


const loginRoute: Router = Router();

loginRoute.route('/')
    .post(validate(validations.postLogin), login);

export default () => {
    return loginRoute;
};