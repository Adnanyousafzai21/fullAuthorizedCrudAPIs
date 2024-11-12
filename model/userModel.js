import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = await mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "the passsword must be atleast 6 charecter longs"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userOtp: {
        type: String,

    },
    otpExpiries: {
        type: String,
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
    next()
})

userSchema.methods.isPasswordCorrected = async function (password) {
    return await bcrypt.compare(password, this.password)

}
export const User = mongoose.model("User", userSchema)