export interface Comment {
    id?: number;
    userID?: string;
    fullName?: string;
    content: string;
    role: string;
    commentDate: Date;
    productID?: number;
}
