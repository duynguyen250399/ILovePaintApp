export interface Shipper {
    id?: number;
    username: string;
    passwordHashed?: string;
    passwordSalted?: string;
    fullName: string;
    birthdate?: Date;
    address: string;
    phoneNumber: string;
    email: string;
    image?: string;
    salary?: number;
}
