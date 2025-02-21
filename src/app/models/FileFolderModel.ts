import { model, Schema } from "mongoose";
import { IFileFolder } from "../interfaces/fileFolder.interface";

const fileFolderSchema = new Schema<IFileFolder>({
  name: { type: String, required: true, trim: true },
  filename: { type: String, required: true, trim: true },
  path: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  size: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, required:true, ref: "User"},
  protected: {type: Boolean, default: false}
});

const FileFolderModel = model<IFileFolder>("FileFolder", fileFolderSchema);
export default FileFolderModel;
