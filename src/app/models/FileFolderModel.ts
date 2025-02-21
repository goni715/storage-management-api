import { model, Schema } from "mongoose";
import { IFileFolder } from "../interfaces/fileFolder.interface";

const fileFolderSchema = new Schema<IFileFolder>({
  name: { type: String, required: true, trim: true },
  filename: { type: String, trim: true },
  path: { type: String, trim: true },
  type: { type: String, trim: true },
  size: { type: Number, default:0 },
  user: { type: Schema.Types.ObjectId, required:true, ref: "User"},
  protected: {type: Boolean, default: false}
},
{
  timestamps: true,
  versionKey: false
}
);

const FileFolderModel = model<IFileFolder>("FileFolder", fileFolderSchema);
export default FileFolderModel;
