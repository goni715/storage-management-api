import { model, Schema } from "mongoose";
import { IFolder } from "../interfaces/folder.interface";


const FolderSchema = new Schema<IFolder>({
  name: { type: String, required: true },
  //user: { type: Schema.Types.ObjectId, ref: "User"}, 
},
{
  timestamps: true,
  versionKey:false
}
);


export default model<IFolder>("Folder", FolderSchema);

