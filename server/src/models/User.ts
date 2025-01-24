export interface IUser {
    type: 'ADMIN' | 'USER';
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    }