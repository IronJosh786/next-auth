import mongoose from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isVerified: boolean;
  forgotPasswordToken?: string | undefined;
  forgotPasswordTokenExpiry?: Date | undefined;
  verifyToken?: string | undefined;
  verifyTokenExpiry?: Date | undefined;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

// this is how it is exported when nextjs is not there
// export const User = mongoose.model("User", userSchema);

// since nextjs doesn't know if the connection is for the first time or not we do it like this
export const User =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);
// 'users' is for code consistency
