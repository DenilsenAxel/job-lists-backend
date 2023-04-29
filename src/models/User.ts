import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  matchPassword(password: string): boolean | PromiseLike<boolean>;
  getSignedToken(): string;
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Can't be blank"],
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [8, "Please use minimum of 8 characters"],
  },
});

UserSchema.pre<IUser>("save", async function (next: any) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = bycrypt.hashSync(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password: string) {
  return await bycrypt.compare(password, this.password);
};
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = model<IUser>("User", UserSchema);
