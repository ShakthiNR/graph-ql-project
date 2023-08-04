import { ApolloError } from "apollo-server"
import mongoose from "mongoose"


export const getTodos = async (parent, args, context) => {
    const { userId } = args
    const { Todo } = context

    const result = await Todo.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ order: 1 })

    return result
}

export const addTodo = async (parent, args, context) => {
    const { todoInput: { task, description, userId } } = args
    const { Todo } = context
    let order = 1;
    try {
        const findTodo = await Todo.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 })

        if (findTodo.length > 0) {
            order = findTodo[0].order + 1
        }
        const newTodo = new Todo({ task, description, userId, order })
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
    const { updateInput: { task, description, isCompleted, _id } } = args
    const { Todo } = context

    try {
        const findTodo = await Todo.findById({ _id: new mongoose.Types.ObjectId(_id) })

        if (!findTodo) throw new ApolloError("Todo Id not found ", "ID_ERROR")

        const result = await Todo.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(_id) }, { task, description, isCompleted }, { new: true })

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

        if (findTodo.length === 0) throw new ApolloError("Todo Id not found ", "ID_ERROR")

        await Todo.deleteOne({ _id: new mongoose.Types.ObjectId(id) })

        return "Todo deleted successfully"
    } catch (err) {
        throw new ApolloError("Error in deleting todo", "SERVER_ERROR")
    }
}

export const removeTodos = async (parent, args, context) => {
    const { userId } = args
    const { Todo } = context

    try {
        const findTodo = await Todo.find({ userId: new mongoose.Types.ObjectId(userId) })
        if (findTodo.length === 0) throw new ApolloError("Id not found ", "ID_ERROR")

        await Todo.deleteMany({ userId: new mongoose.Types.ObjectId(userId) })

        return "Todo deleted successfully"

    } catch (err) {
        throw new ApolloError("Error in deleting todo", "SERVER_ERROR")
    }

}
export const updateTodoOrders = async (parent, args, context) => {
    const { updateOrderInput } = args
    const { Todo } = context

    try {
        const promises = updateOrderInput.map(async (todo) => {
            let { _id, order } = todo
            const promise = Todo.updateOne({ _id }, { $set: { order } })
            return promise
        })
        await Promise.all(promises)
        return "Success"
    } catch (err) {
        throw new ApolloError("Error in updating todo orders", "SERVER_ERROR")
    }
}