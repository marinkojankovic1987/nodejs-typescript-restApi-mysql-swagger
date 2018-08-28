import { Injector } from '../dependency-injections/injector';
import QueryService from './querys.service';

const querys = Injector.resolve<QueryService>(QueryService);


export function createId(letters) {
    return letters + (new Date().valueOf()).toString();
}
export async function getUserData(user_name) {
    return new Promise((resolve, reject) => {
        querys.getSomeFieldsByField('users',
            ['id', 'user_name', 'first_name', 'last_name', 'role'],
            'user_name', user_name)
            .then((result) => {
                resolve(result[0]);

            }).catch((err) => {
                reject(err)
            })
    })
}

export async function getUserById(id) {
    return new Promise((resolve, reject) => {
        querys.customQuery(
            'select id,user_name,first_name,' +
            'last_name,date_of_birth,gender,' +
            'city,created,role,country '+
            'from users '+
            'where id="' + id + '"'
        ).then((result) => {
            resolve(result[0])
        }).catch((err) => {
            reject(err)
        })
    })
}


