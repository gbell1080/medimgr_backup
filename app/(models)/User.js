import mongoose, { Schema } from "mongoose";

try {
  mongoose.connect(process.env.MONGO_URI);
} catch (error) {}
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  name: String,
  email: String,
  role: String,
  active: Boolean,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
