import { model, Schema } from "mongoose";
import { IProtected } from "../interfaces/protected.interface";
import hashedPassword from "../utils/hashedPassword";

const ProtectedSchema = new Schema<IProtected>({
  user: { type: Schema.Types.ObjectId, required:true, ref: "User"},
  password: {type: String, required: true}
},{
  timestamps: true,
  versionKey: false
}
);


//Hash Password before saving
ProtectedSchema.pre("save", async function (next) {
    const data = this; //this means protected data
  
    // Only hash the password if it has been modified (or is new)
    if (!data.isModified("password")) return next();
  
    data.password = await hashedPassword(data.password);
    next();
  });

const ProtectedModel = model<IProtected>("Protected", ProtectedSchema);
export default ProtectedModel;
