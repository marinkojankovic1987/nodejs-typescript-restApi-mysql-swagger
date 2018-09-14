import httpErrors from './http-errors.map';
import globalErrors from './global-errors.map';

const getHttpError = (key) => {
    return httpErrors[key];
}

const getGlobalError = (key) => {
    return globalErrors[key];
}

export { getGlobalError, getHttpError };