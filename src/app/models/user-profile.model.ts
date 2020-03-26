export interface UserProfile{
    username: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    rewardPoints: number;
    birthdate?: Date;
    image?: string;
}