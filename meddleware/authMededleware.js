import Jwt from "jsonwebtoken"

const authMedleware = (req, res, next) => {

    const token = req.header("Authorization")?.split(' ')[1]

    if (!token) {
        return res.status(400).send({ message: "Access Denied no token provided" })
    }

    const decode = Jwt.verify(token, process.env.JWT_SECRET_KEY)

    if (!decode) {
        return res.status(404).send({ message: "token is not valid" })
    }
    console.log("decoded token is here", decode)

    req.user = decode
    next()
}

export default authMedleware