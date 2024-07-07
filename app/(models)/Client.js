import mongoose, { Schema } from "mongoose";

try {
  mongoose.connect(process.env.MONGO_URI);
} catch (error) {
  console.log("THIS IS THE ERROR", error);
}
mongoose.Promise = global.Promise;

const ClientSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  { timestamps: true }
);

const Client = mongoose.models.Client || mongoose.model("Client", ClientSchema);

export default Client;
