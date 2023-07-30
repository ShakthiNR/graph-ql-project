import { ApolloError } from "apollo-server";
import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const RegisterUser = async (parent, args, context) => {
    const {
        registerInput: { username, password, email, confirmpassword },
    } = args; // input

    const { User } = context; // db
    try {
        // Check if user is already registered
        const oldUser = await User.findOne({ email });

        if (oldUser)
            throw new ApolloError(
                "User already registered with this email" + email,
                "USER_ALREADY_EXISTS"
            );

        // Check if password is equal to confirm password
        if (password !== confirmpassword)
            throw new ApolloError(
                "Password doesnot match" + email,
                "PASSWORD_MISMATCH"
            );

        // Encrypt the password
        let encryptedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            password: encryptedPassword,
            email
        })
        const token = Jwt.sign({ userId: newUser._id, email }, process.env.SECRET_KEY, { expiresIn: "2h" })
        newUser.token = token

        // Save in db
        const res = await newUser.save()

        return {
            _id: res._id,
            ...res._doc
        }

    } catch (err) {
        throw new ApolloError("Server error: " + err.message);
    }
};

export const getUser = async (parent, args, context) => {
    const { id } = args
    const { User } = context

    const user = await User.findOne({ _id: id })
    return user
}

export const LoginUser = async (_, args, context) => {
    const { loginInput: { email, password } } = args

    if(!email || !password) throw new ApolloError("Please enter in email and password inputs", "INVALID_CREDENTIALS")
    const { User } = context

    const user = await User.findOne({ email })

    if(!user)  throw new ApolloError("Invalid username or password", "INVALID_CREDENTIALS")

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new ApolloError("Invalid credentials", "INVALID_CREDENTIALS")
    }

    const token = Jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "2h" })
    user.token = token

    return {
        id: user.id,
        ...user._doc
    }
}