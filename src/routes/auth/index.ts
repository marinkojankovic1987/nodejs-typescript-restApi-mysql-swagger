import { Router } from 'express';
import  login  from './login.route';
import  register  from './register.route';
import  user  from './user.route';
import  forgotPassword  from './forgot-password.route';
import  changedPassword  from './change-password.route';

const auth:Router = Router();
auth.use('/login',login());
auth.use('/register',register());
auth.use('/user',user());
auth.use('/change-password',changedPassword());
auth.use('/forgot-password',forgotPassword());


export default () => {
    return auth;
};