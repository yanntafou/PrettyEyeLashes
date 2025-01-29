import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bookableItem: { type: mongoose.Schema.Types.ObjectId, ref: 'bookableItem', required: true },
    date: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
})

// create our database and avoid repeat creation which leads to an error
const bookModel = mongoose.models.book || mongoose.model("book", bookSchema);

export default bookModel