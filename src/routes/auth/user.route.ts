import { Router } from 'express';
import * as validate from 'express-validation';
import validations from './validation/register';
import { setAuth } from '../../services/common.service';
import { register } from '../../controllers/auth/register.controller';
import { getOne, list, updateById, deleteById } from '../../controllers/auth/user.controller';


const userRoute: Router = Router();

userRoute.route('/')
    .post(validate(validations.postRegister),setAuth, register);

userRoute.get('/:id',setAuth, getOne)
    .get('/',setAuth, list)
    .put('/:id',setAuth, updateById)
    .delete('/:id',setAuth, deleteById)

export default () => {
    return userRoute;
};