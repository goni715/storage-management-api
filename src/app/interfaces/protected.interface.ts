import { Types } from "mongoose";


export interface IProtected{
    user: Types.ObjectId;
    password: string;  
}