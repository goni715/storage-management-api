import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import hashedPassword from "../utils/hashedPassword";
import validator from "validator";

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          // Regex to validate username
          // This example allows alphanumeric characters, underscores, and hyphens
          // Username must be between 3 and 20 characters long
          return /^[a-zA-Z0-9_-]{3,20}$/.test(v);
        },
        message: `Invalid username, Only alphameric characters, underscores and hypens are allowed. No space are permitted. 20 characters long`,
      },
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not valid email",
      },
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//Hash Password before saving
UserSchema.pre("save", async function (next) {
  const user = this; //this means user

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  user.password = await hashedPassword(user.password);
  next();
});

const UserModel = model<IUser>("User", UserSchema);
export default UserModel;
