import { Router } from 'express';
import  login  from './login.route';
import  register  from './register.route';
import  user  from './user.route';

const auth:Router = Router();
auth.use('/login',login());
auth.use('/register',register());
auth.use('/user',user());


export default () => {
    return auth;
};