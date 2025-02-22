export interface IUser {
    username: string;
    email: string;
    password: string;
}


export type TLogin = {
    email: string;
    password: string
}

export type TChangePass = {
    oldPassword: string;
    newPassword: string
}
