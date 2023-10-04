import { Role } from "./Role";

export class Customer {
    'userId': number;
    'email': string;
    'name': string;
    'password': string;
    'image': string;
    'address': string;
    'phone': string;
    'gender': boolean;
    'registerDate': Date;
    'status': boolean;
    'roles': Role[];
    'token': string;

    constructor(id: number) {
        this.userId = id;
    }
}
