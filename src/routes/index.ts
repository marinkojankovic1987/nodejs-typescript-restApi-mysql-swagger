import { Router } from 'express';
import auth from './auth';

let api: Router = Router();
api.use('/auth', auth());

export default () => {
    return api;
}