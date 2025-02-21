import { Types } from "mongoose";


export interface IFavourite{
    user: Types.ObjectId;
    fileOrFolder: Types.ObjectId;
}