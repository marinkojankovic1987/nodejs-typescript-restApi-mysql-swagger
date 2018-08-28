import  * as Joi from 'joi';

export default {
  postLogin: {
    body: {
      user_name: Joi.string().email({ minDomainAtoms: 2 }),
      password: Joi.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/),
    }
  }
};