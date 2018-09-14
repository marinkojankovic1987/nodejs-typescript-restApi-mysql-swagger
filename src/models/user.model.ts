import { createId, createPassword } from '../services/common.service';

export interface UserInterface{
    user_name: string;
    password: string;
    first_name: string;
    last_name: string;
    url_image: string;
    date_of_birth: Date;
    gender: string;
    phone: string;
    role: number;
    city: string;
    country: string;
    created:Date;
    updated:Date;
}

class User implements UserInterface{

    public id:string;
    is_active: boolean;
    public created:Date;
    public updated:Date;

    constructor(
        public user_name: string,
        public password: string,
        public first_name: string,
        public last_name: string,
        public url_image: string,
        public date_of_birth: Date,
        public gender: string,
        public phone: string,
        public role: number,
        public city: string,
        public country: string,
    ) {
        this.id = createId('u');
        this.user_name = user_name;
        this.password = createPassword(password);
        this.first_name = first_name;
        this.last_name = last_name;
        this.url_image = url_image;
        this.date_of_birth = new Date();
        this.gender = gender;
        this.phone = phone;
        this.role = role;
        this.city = city;
        this.country = country;
        this.is_active = false;
        this.created = new Date();
        this.updated = new Date();
    }
}

export default User;