import { model, Schema } from "mongoose";
import { IFile } from "../interfaces/file.interface";

const fileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  folder: { type: Schema.Types.ObjectId, ref: "Folder", default: null }, // Parent folder
});

export default model<IFile>("File", fileSchema);
