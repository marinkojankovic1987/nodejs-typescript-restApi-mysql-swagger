import {Injector} from '../dependency-injections/injector';
import {Service} from '../dependency-injections/decorators';
import DataBaseService from './database.service';
import {setValue} from './common.service';


const dbService = Injector.resolve<DataBaseService>(DataBaseService);

@Service()
class QuerysSevice{
    constructor() {
    }
    getAllFields(table) {
        return new Promise((resolve, reject) => {
            dbService.query('SELECT * FROM ' + table, []).then((r) => {
                resolve(r);
            })
        })
    }
    getSomeFieldsByMultiFields(table, fields, filter, limit, offset) {
        if (fields) {
            fields = [fields];
        }
        else {
            fields = '*';
        }

        let _fields:any = '';
        let _length:any = fields.length - 1;
        for (let x in fields) {
            if (x == _length) {
                _fields += fields[x];
            }
            else {
                _fields += fields[x] + ',';
            }
        }
        let _where = '';
        let _limit = '';
        let _offset = '';
        if (limit != '' && limit != undefined) {
            _limit += ' LIMIT ' + limit;
        }
        if (offset != '' && offset != undefined) {
            _offset += ' OFFSET ' + offset;
        }

        if(Object.keys(filter).length>0){
                 for (let x in Object.keys(filter)) {
                     let key = Object.keys(filter)[x];
                if (x == '0') {
                    _where += ' WHERE ' + key + '="' + filter[key] + '"';
                }
                else {
                    _where += ' AND ' + key + '="' + filter[key] + '"';
                }
            }
        }

        return new Promise((resolve, reject) => {
            dbService.query('SELECT ' + _fields + ' FROM ' + table + _where + _limit + _offset, []).then((r) => {
                resolve(r);
            }).catch((r) => {
                reject(r)
            });
        })
    }
    getCustomWithJoinAndLimitOffset(sql, terms_value, limit, offset) {

        let _limit = '';
        let _offset = '';
        if (limit != '' && limit != undefined) {
            _limit += ' LIMIT ' + limit;
        }
        if (offset != '' && offset != undefined) {
            _offset += ' OFFSET ' + offset;
        }

        return new Promise((resolve, reject) => {
            dbService.query(sql + terms_value + _limit + _offset, []).then((r) => {
                resolve(r);
            }).catch((r) => {
                reject(r)
            });
        })
    }
    getSomeFieldsByField(table, fields, field, value) {
        let _fields = '';
        let _length:any = fields.length - 1;
        for (let x in fields) {
            if (x == _length) {
                _fields += fields[x];
            }
            else {
                _fields += fields[x] + ',';
            }
        }
        return new Promise((resolve, reject) => {
            dbService.query('SELECT ' + _fields + ' FROM ' + table + ' WHERE ' + field + '="' + value + '"', []).then((r) => {
                console.log(r);
                resolve(r);
            }).catch((r) => {
                reject(r)
            });
        })
    }
    getAllOnlySomeFields(table, fields) {
        let _fields = '';
        let _length:any = fields.length - 1;
        for (let x in fields) {
            if (x == _length) {
                _fields += fields[x];
            }
            else {
                _fields += fields[x] + ',';
            }
        }
        return new Promise((resolve, reject) => {
            dbService.query('SELECT ' + _fields + ' FROM ' + table, []).then((r) => {
                resolve(r);
            }).catch((r) => {
                reject(r)
            });
        })
    }
    getById(table, id) {
        return new Promise((resolve, reject) => {
            dbService.query('SELECT * FROM ' + table + ' WHERE id="' + id + '"', []).then((r) => {
                resolve(r);
            }).catch((r) => {
                reject(r)
            });
        })
    }
    getByIdOnlySomeFields(table, id, fields) {
        let _fields = '';
        let _length:any = fields.length - 1;
        for (let x in fields) {
            if (x == _length) {
                _fields += fields[x];
            }
            else {
                _fields += fields[x] + ',';
            }
        }
        return new Promise((resolve, reject) => {
            dbService.query('SELECT ' + _fields + ' FROM ' + table + ' WHERE id="' + id + '"', []).then((r) => {
                resolve(r);
            }).catch((r) => {
                reject(r)
            });
        })
    }
    insertData(table, data) {
        return new Promise((resolve, reject) => {
            dbService.query('INSERT INTO ' + table + ' SET ?', data).then((r:any) => {
                if (r.insertId = !undefined) {
                    dbService.query('SELECT id FROM ' + table + ' WHERE id=last_insert_id()  ORDER BY created DESC LIMIT 1', []).then((res) => {
                        resolve(res);
                    }).catch((res) => {
                        reject(res);
                    })
                }

            }).catch((r) => {
                reject(r)
            });
        })
    }
    insertDataWithoutId(table, data) {
        return new Promise((resolve, reject) => {
            dbService.query('INSERT INTO ' + table + ' SET ?', data).then((r) => {
                resolve(r);

            }).catch((r) => {
                reject(r)
            });
        })
    }
    updateData(table, data, id) {
        return new Promise((resolve, reject) => {
            dbService.query('UPDATE ' + table + ' SET ? WHERE id ="' + id + '"', data).then((r) => {
                resolve(r);
            }).catch((r) => {
                reject(r)
            });
        })
    }
    updateDataMoreWere(table, data, filter, terms_value) {
        let _where = '';
        if(Object.keys(filter).length>0){
            for (let x in Object.keys(filter)) {
                let key = Object.keys(filter)[x];
           if (x == '0') {
               _where += ' WHERE ' + key + '="' + filter[key] + '"';
           }
           else {
               _where += ' AND ' + key + '="' + filter[key] + '"';
           }
       }
   }
        return new Promise((resolve, reject) => {
            dbService.query('UPDATE ' + table + ' SET ? ' + _where, data).then((r) => {
                resolve(r);
            }).catch((r) => {
                reject(r)
            });
        })
    }
    customQuery(query) {
        return new Promise((resolve, reject) => {
            dbService.query(query, []).then((r) => {
                resolve(r);
            }).catch((r) => {
                reject(r)
            });
        })
    }

}

export default QuerysSevice;