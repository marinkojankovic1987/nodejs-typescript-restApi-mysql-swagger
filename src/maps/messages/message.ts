import httpErrors from './http-messages.map';
import globalErrors from './global-messages.map';

const getHttpMessage = (key) => {
    return httpErrors[key];
}

const getGlobalMessage = (key) => {
    return globalErrors[key];
}

export { getGlobalMessage, getHttpMessage };