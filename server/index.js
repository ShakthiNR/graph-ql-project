import { ApolloServer } from "apollo-server";
import typeDefs from "./typeDefs/index";
import resolvers from "./resolvers/index";
import User from "./models/User";
import Todo from "./models/Todo";
import dotenv from "dotenv";
import connectToDatabase from "./db"
import authMiddleware from "./middleware/auth"
dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {

   // const user =  authMiddleware({ req })
   
    const result = { user:null, User, Todo };
    return result;
  },
});

async function startServer() {
  try{
    await connectToDatabase()
    const { url } = await server.listen({ port: process.env.PORT || 4000 })
    console.log("🚀 Server is running on ", url);
  } catch (err){
    console.log("Server error ☹️", err.message)
  }
  
}

startServer()

//! Server in promise mode
// server.listen({ port: process.env.PORT || 4000 }).then(({ port }) => {
//   console.log("Server is running on ", port);
// });
