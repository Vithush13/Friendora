import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  full_name: { type: String },
  password: { type: String, required: true },
  profile_picture: { type: String, default: "" },
  bio: { type: String, default: "Hey there! I am using Friendora." },
  location: { type: String, default: "" },
  followers: [{ type: String, ref: "User" }],
  following: [{ type: String, ref: "User" }],
  connections: [{ type: String, ref: "User" }],
}, { timestamps: true });


//hash password before saving
userSchema.pre("save", async function (){
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});


//compare password
userSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model("User", userSchema)

export default User;