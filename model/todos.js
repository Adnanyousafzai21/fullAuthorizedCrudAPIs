import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: [{
        previewUrl: String,
    }]
})
const Todos = mongoose.model("Todos", todoSchema)

export default Todos