export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }

export interface UserData {
    accessToken: string;
    balance: number;
    emaiilUnitCost: string;
    email: string;
    id: string;
    isVerified: boolean;
    name: string;
    refreshToken: string;
    smsUnitCost: string;
    userName: string;
}