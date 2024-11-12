import { Router } from "express";
import { Forgetpassword, Login, Otpmessage, Register, Resetpassword } from "../controller/userController.js";

const userRoutes = Router()

userRoutes.post("/register", Register)
userRoutes.post("/login", Login)
userRoutes.post("/forget-password", Forgetpassword)
userRoutes.post("/otpmessage", Otpmessage)
userRoutes.post("/reset-password", Resetpassword)

export default userRoutes