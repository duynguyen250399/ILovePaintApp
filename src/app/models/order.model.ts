import { OrderItem } from './order-item.model';

export interface Order{
    id?: number;
    fullName: string;
    phoneNumber: string;
    address: string;
    email: string;
    gender: boolean;
    notes?: string;
    orderDate?: Date;
    status?: number;
    isMember?: boolean;
    orderItems?: OrderItem[];
}