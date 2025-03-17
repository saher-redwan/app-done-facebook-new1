import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    name: String,
    image: String,
    SignUp_provider: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
