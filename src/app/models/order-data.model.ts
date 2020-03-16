import { Order } from './order.model';
import { OrderItem } from './order-item.model';

export interface OrderData{
    order: Order;
    orderItems: OrderItem[];
}