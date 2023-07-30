import { RegisterUser, getUser as User, LoginUser } from "./User";
import { getTodos as Todo, addTodo as AddTodo, removeTodo as RemoveTodo, updateTodo as UpdateTodo } from "./Todo"
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';


const resolvers = {
    Query: {
        User,
        Todo
    },
    Mutation: {
        RegisterUser,
        LoginUser,
        AddTodo,
        RemoveTodo,
        UpdateTodo
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    })
};

export default resolvers;
