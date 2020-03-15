export interface OrderItemCart {
    id?: number;
    productId: number;
    productName: string;
    productPrice: number;
    quantity: number;
    amount: number;
    image?: string;
}
