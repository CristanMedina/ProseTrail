import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        console.log("mongo_uri: ", process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Conectado: ${conn.connection.host}`)
    } catch (error) {
        console.log('Error para conectar a MongoDB: ', error.message)
        process.exit(1)
    }
}