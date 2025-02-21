import { model, Schema } from "mongoose";
import { IFile } from "../interfaces/file.interface";

const fileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  path: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  //user: { type: Schema.Types.ObjectId, required:true, ref: "users"}, 
});

export default model<IFile>("File", fileSchema);
