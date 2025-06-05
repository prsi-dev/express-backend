import mongoose, { Schema } from "mongoose";
import { IUser } from "../../interfaces/user.interface";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Index for email lookups
UserSchema.index({ email: 1 });

export const User = mongoose.model<IUser>("User", UserSchema);
