import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/fullcrudauthintication`)
        console.log("connected DB !!", connectionInstance.connection.host)
    } catch (error) {
        console.log("error while connecting db!!", error)
    }
}

export default connectDB