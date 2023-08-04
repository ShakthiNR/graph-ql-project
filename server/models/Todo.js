import { Schema, model } from "mongoose";
import autoIncrement from 'mongoose-auto-increment';
import mongoose from "mongoose"
autoIncrement.initialize(mongoose.connection);
const ObjectId = Schema.Types.ObjectId


const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String
    },
    order: {
        type: Number,
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