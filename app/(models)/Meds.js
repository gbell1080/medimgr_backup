import mongoose, { Schema } from "mongoose";

try {
  mongoose.connect(process.env.MONGO_URI);
} catch (error) {}
mongoose.Promise = global.Promise;

const MedicationSchema = new Schema(
  {
    title: String,
    description: String,
    currentTotal: Number,
    expectedTotal: Number,
    destroyed: Number,
    returned: Number,
    stockLevel: Number,
    person: String,
    signedOffBy: String,
    active: Boolean,
  },
  { timestamps: true }
);

const Medication =
  mongoose.models.Medication || mongoose.model("Medication", MedicationSchema);

export default Medication;
