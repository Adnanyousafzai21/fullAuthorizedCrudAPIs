// import User from"""
import { User } from "../model/userModel.js"
import { jwtToken } from "../utilites/jwtToken.js"
import nodemailer from "nodemailer"

export const Register = async (req, res, next) => {
    console.log("req.body", req.body)
    const { username, email, password } = req.body

    if ([username, email, password].some(item => item == "")) {
        res.status(400).send({ message: "all field are required !!" })
    }


    const emailExist = await User.findOne({ email }).select('-otpExpiries -userOtp')
    if (emailExist) {

        return res.status(400).send({ message: "user Exist already flease try another" })

    }
    console.log("created just i about to register in DB")

    const createUser = new User(
        {
            username,
            email,
            password
        }
    )

    console.log("created just i about to register in DB")

    const createdUser = await createUser.save()
    if (!createdUser) {
        return res.send("Error while creating user")
    }

    res.status(200).send({ message: "user created successfully" })

}
export const Login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ message: "Email and Password  are required!!" })
    }

    const user = await User.findOne({ email }).select('-otpExpiries -userOtp')
    if (!user) {
        return res.status(500).send({ message: "user not Exist please register " })
    }


    const passowrdCheck = await user.isPasswordCorrected(password)
    if (!passowrdCheck) {
        return res.status(400).send({ message: "eamil or password not valid" })
    }
 
    console.log("before jwt created")
    const token = await jwtToken(user._id)
    if (!token) {
        res.send({ message: "error whiel generating JWT Token" })
    }
    
    res.status(200).send({ message: "use loged in successfully", token, user })
}

export const Forgetpassword = async (req, res, next) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).send({ message: "email i required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).send({ message: "user not found with this email " })
    }

console.log("forget passwoed hited")
    const otp = Math.floor(100000 + Math.random() * 999999)
    const otpExpiries = new Date(Date.now() + 6 * 1000)

    user.userOtp = otp
    user.otpExpiries = otpExpiries
    user.save()

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "adnanrafiq7522@gmail.com",
            pass: process.env.APP_PASS
        }
    })

    const mailOptions = {
        from: "adnanrafiq7522@gamil.com",
        to: email,
        subject: "Your 6 digit otp",
        text: `Your OTP code is ${otp}. It will expire in 6 minutes.`
    }

        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error whiel sendein mail ", error)
            return res.status(500).send({ message: "errro while sending otp " })
        }
        else {
            return res.status(200).send({ message: "otp send successfully to your gamil" })
        }
    })
}
export const Otpmessage = async (req, res, next) => {
    const { otpcode, email } = req.body
    if (!otpcode || !email) {
        return res.status(400).send({ message: "pleas provide email and otp code " })
    }
    console.log("top and eamil ", otpcode, email)

    const user = await User.findOne({ email })

    if (!user) {
        return res.stauts(404).send({ message: "user not found " })
    }
    console.log("otp code", user.userOtp)
    if (otpcode != user.userOtp) {
        return res.status(400).send({ message: "invalid otp code " })
    }

    if (user.otpExpiries < new Date()) {
        return res.status(400).send({ message: "the otp has been expiried please resend request" })
    }

    res.status(200).send({ message: "opt code has beed verified successfylly!" })
}

export const Resetpassword = async (req, res, next) => {

    const { email, newpassword } = req.body
    if (!email || !newpassword) {
        return res.status(400).send({ message: "the eamil and new passwrod are required" })
    }
    const user = await User.findOne({ email })

    user.password = newpassword
    const updateuser = await user.save()
    if (!updateuser) {
        res.status(500).send({ message: " errror while updating passwrod !!! " })
    }

    res.status(200).send({ message: "Reset password controller has been called " })

}