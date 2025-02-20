
export interface IOtp {
    email: string;
    otp: string;
    status: number;
    otpExpires: Date
}

export interface IVerifyOTp {
    email: string;
    otp: string;
}