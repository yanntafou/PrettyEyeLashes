import mongoose from "mongoose";

const bookableItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },

});

const bookableItem = mongoose.models.BookableItem || mongoose.model('BookableItem', bookableItemSchema);

export default bookableItem;
