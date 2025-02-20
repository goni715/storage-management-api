import { model, Schema } from "mongoose";
import { IFolder } from "../interfaces/folder.interface";


const FolderSchema = new Schema<IFolder>({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Folder", default: null }, // Nested folders
},
{
  timestamps: true,
  versionKey:false
}
);


export default model<IFolder>("Folder", FolderSchema);

