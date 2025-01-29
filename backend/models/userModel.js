import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} } //creat a data with empty object even if the user has nothing in his cart
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel