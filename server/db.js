import mongoose from "mongoose"

export default async function connectToDatabase(){
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected to database")

    }catch(err){
        console.log("Err ", err)
        throw new Error("Error in connectToDatabase")
    }
}