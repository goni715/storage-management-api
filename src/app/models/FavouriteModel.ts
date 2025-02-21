import { model, Schema } from "mongoose";
import { IFavourite } from "../interfaces/favourite.interface";

const FavouriteSchema = new Schema<IFavourite>({
  user: { type: Schema.Types.ObjectId, required:true, ref: "User"},
  fileOrFolder: {type: Schema.Types.ObjectId, required: true, ref:"FileFolder"}
},{
  timestamps: true,
  versionKey: false
}
);


const FavouriteModel = model<IFavourite>("Favourite", FavouriteSchema);
export default FavouriteModel;
