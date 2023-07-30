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
    id: ID!
    task: String
    description: String
    isCompleted: Boolean
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
  }
`;

export default typeDefs;
