import Jwt from "jsonwebtoken"

export const jwtToken = async ({ userId }) => {

    console.log("jwtExpired",process.env.JWT_EXPIRIES, "jwt secret key", process.env.JWT_SECRET_KEY)

    return Jwt.sign({userId}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRIES})
}