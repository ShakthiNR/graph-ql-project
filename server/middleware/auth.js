import { AuthenticationError } from "apollo-server";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const authMiddleware = ({ req }) => {
    const authHeader = req.header.authorization;
    let user;

    if (authHeader) {
        const token = authHeader.split("Bearer")[1];
        if (!token) {
            user = null;
            return user
        }

        try {
            user = Jwt.verify(token, process.env.SECRET_KEY) // signed with {userId, email} so it return that object
            return user
        } catch (err) {
            throw new AuthenticationError("Invalid / Expired token")
        }

    }
    throw new AuthenticationError("Authentication token required")
}

export default authMiddleware