import { Router } from 'express';
import * as validate from 'express-validation';
import validations from './validation/hash';
import { getDataFromHashTable, changePasswordByHash } from '../../controllers/auth/hash.controller';


const changePasswordRoute: Router = Router();

changePasswordRoute.route('/:hash')
    .get(getDataFromHashTable)
    .post(validate(validations.passwordHash), changePasswordByHash);

export default () => {
    return changePasswordRoute;
};