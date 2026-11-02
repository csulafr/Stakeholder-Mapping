import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function fixPasswords() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    const bpmaHash = await bcrypt.hash("123456", 10);
    const pemaHash = await bcrypt.hash("123456", 10);

    const bpma = await User.findOneAndUpdate(
      { email: "bpma@gmail.com" },
      { $set: { password: bpmaHash } },
      { new: true }
    );

    const pema = await User.findOneAndUpdate(
      { email: "pema@gmail.com" },
      { $set: { password: pemaHash } },
      { new: true }
    );

    console.log("✅ BPMA:", bpma?.email);
    console.log("✅ PEMA:", pema?.email);
    console.log("✅ Password berhasil di-hash ulang");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

fixPasswords();