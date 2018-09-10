import { createId, createPassword } from '../services/common.service';  
export interface HashInterface{
    id:string,
    hash: string;
    time_to_live: number;
    data: any;
    expired: boolean;
    expire_after_first_access: boolean;
    created:Date;
    updated:Date;
}

class Hash implements HashInterface{

    public id:string;
    public hash: string;
    public expired: boolean;
    public created:Date;
    public updated:Date;

    constructor(
        public expire_after_first_access: boolean,
        public time_to_live: number,
        public data: any,
    ) {
        this.id = createId('h');
        this.hash = 'ccc';
        this.expired = false;
        this.expire_after_first_access = expire_after_first_access;
        this.time_to_live = time_to_live;
        this.data = data;
        this.created = new Date();
        this.updated = new Date();
    }
}

export default Hash;