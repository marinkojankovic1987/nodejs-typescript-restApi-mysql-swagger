import  * as Joi from 'joi';

export default {
  postRegister: {
    body: {
      user_name: Joi.string().email({ minDomainAtoms: 2 }),
      password: Joi.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      gender: Joi.string().required(),
      phone: Joi.string().required()
    }
  }
};