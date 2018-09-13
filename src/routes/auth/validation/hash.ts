import * as Joi from 'joi';

export default {
    postHash: {
        body: {
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        }
    },
    passwordHash: {
        body: {
            password: Joi.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }
    }
};