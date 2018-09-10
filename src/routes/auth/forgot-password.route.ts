import { Router } from 'express';
import * as validate from 'express-validation';
import validations from './validation/hash';
import { storeToHashTable } from '../../controllers/auth/hash.controller';


const forgotPasswordRoute: Router = Router();

forgotPasswordRoute.route('/')
    .post(validate(validations.postHash), storeToHashTable);

export default () => {
    return forgotPasswordRoute;
};