import { Types } from "mongoose";


export interface IFileFolder{
    name: string;
    filename: string;
    path: string;
    type: 'folder' | 'image' | 'pdf' | 'note';
    size: number;
    user: Types.ObjectId;
    protected: boolean;
}

export interface IRenameFile{
    fileFolderId: string;
    name: string;
}
