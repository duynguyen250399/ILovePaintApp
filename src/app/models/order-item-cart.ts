export interface OrderItemCart {
    id?: number;
    productId: number;
    productName: string;
    productPrice: any;
    quantity: number;
    amount: number;
    image?: string;
    volumeValue: number;
}
