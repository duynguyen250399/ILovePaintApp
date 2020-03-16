export interface Order{
    id?: number;
    fullName: string;
    phoneNumber: string;
    address: string;
    email: string;
    gender: boolean;
    notes?: string;
    status?: number;
}