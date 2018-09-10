import * as Joi from 'joi';

export default {
    postHash: {
        body: {
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        }
    }
};