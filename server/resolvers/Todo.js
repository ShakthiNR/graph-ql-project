import { ApolloError } from "apollo-server"
import mongoose from "mongoose"


export const getTodos = async (parent, args, context) => {
    const { userId } = args
    const { Todo } = context

    const result = await Todo.find({ userId: new mongoose.Types.ObjectId(userId) })

    return result
}

export const addTodo = async (parent, args, context) => {
    const { todoInput: { task, description, userId } } = args
    const { Todo } = context

    try {
        const newTodo = new Todo({ task, description, userId })
        const result = await newTodo.save()

        return {
            _id: result._id,
            ...result._doc
        }
    } catch (err) {
        throw new ApolloError("Error in saving todo", "SERVER_ERROR")
    }

}

export const updateTodo = async (parent, args, context) => {
    const { updateInput: { task, description, isCompleted, id } } = args
    const { Todo } = context

    try {
        const findTodo = await Todo.findById({ _id: new mongoose.Types.ObjectId(id) })

        if (!findTodo) throw new ApolloError("Todo Id not found ", "ID_ERROR")

        const result = await Todo.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { task, description, isCompleted }, {new: true})

        return {
            _id: result._id,
            ...result._doc
        }

    } catch (error) {
        throw new ApolloError("Error in updating todo", "SERVER_ERROR")
    }
}

export const removeTodo = async (parent, args, context) => {
    const { id } = args
    const { Todo } = context

    try {
        const findTodo = await Todo.findById({ _id: new mongoose.Types.ObjectId(id) })

        if (!findTodo) throw new ApolloError("Todo Id not found ", "ID_ERROR")

        await Todo.deleteOne({ _id: new mongoose.Types.ObjectId(id) })

        return "Todo deleted successfully"
    } catch (err) {
        throw new ApolloError("Error in deleting todo", "SERVER_ERROR")
    }

}