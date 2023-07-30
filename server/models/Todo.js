import { Schema, model } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    },
    description: {
        type: String
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const Todo = model("Todo", todoSchema)

export default Todo