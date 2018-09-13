import * as mysql from 'mysql';
import { Service } from '../dependency-injections/decorators';
import { DB_CONNECTION, DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME } from '../configs/config';

@Service()
class DataBaseService {
    dbPool: any;
    dbConfig: any = {
        host: DB_HOST,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE
    }

    constructor() {
        this.dbPool = mysql.createPool(this.dbConfig);
    }

    query(sql, params) {
        console.log('sql', sql);

        return new Promise((resolve, reject) => {
            this.dbPool.getConnection((error, conn) => {
                if (error) {
                    console.log('conn fall');
                    reject(error);
                }
                else {
                    console.log('conn succes');
                    conn.query(sql, params, (err, result) => {
                        console.log('query succes');
                        if (!err) {
                            resolve(result);
                            return conn.release();
                        }
                        console.log(err);
                        reject(err)
                        conn.release();
                    })
                }
            })
        })

    }
}

export default DataBaseService;


