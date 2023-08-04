import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    token: String!
  }

  type Todo {
    _id: ID!
    task: String!
    isCompleted: Boolean!
    description: String!
    createdAt: Date!
    updatedAt: Date!
    order: Int
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmpassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input TodoInput {
    task: String!
    description: String!
    userId: ID!
  }

  input UpdateInput {
    _id: ID!
    task: String
    description: String
    isCompleted: Boolean
  }

  input UpdateOrderInput{
    _id: ID!
    order:Int!
  }

  type Query {
    User(id: ID!): User!
    Todo(userId: ID!): [Todo!]
  }

  type Mutation {
    RegisterUser(registerInput: RegisterInput): User
    LoginUser(loginInput: LoginInput): User
    AddTodo(todoInput: TodoInput): Todo
    RemoveTodo(id: ID!): String
    UpdateTodo(updateInput: UpdateInput): Todo!
    UpdateTodoOrders(updateOrderInput: [UpdateOrderInput!]!): String
    RemoveTodos(userId: ID!) :String
  }
`;

export default typeDefs;
