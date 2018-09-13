import { Router } from 'express';
import * as validate from 'express-validation';
import validations from './validation/hash';
import { getFromHashTable, changePasswordByHash } from '../../controllers/auth/hash.controller';


const changePasswordRoute: Router = Router();

changePasswordRoute.route('/:hash')
    .get(getFromHashTable)
    .post(validate(validations.passwordHash), changePasswordByHash);

export default () => {
    return changePasswordRoute;
};