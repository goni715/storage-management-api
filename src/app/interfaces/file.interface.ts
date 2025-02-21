import { Types } from "mongoose";


export interface IFile{
    name: string;
    path: string;
    type: string;
    size: number;
    //user: Types.ObjectId;
}
