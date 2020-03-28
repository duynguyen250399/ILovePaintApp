export interface UserProfile{
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    rewardPoints: number;
    birthdate?: Date;
    image?: string;
    gender?: boolean;
}