import express from "express"
import cors from "cors"

import connectDB from "./db/index.js";
import userRoutes from "./routes/userRoutes.js";

import { configDotenv } from "dotenv"
import todoRouter from "./routes/todos.js";
configDotenv({ path: "./.env" });

const app = express()

connectDB()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send({ message: "you are app is successfully runing" })
})


app.use("/api/user", userRoutes)
app.use("/api/todo", todoRouter)

app.listen(process.env.PORT, () => {
    console.log(`your app is listinin on port ${process.env.PORT}`)
})