import express from "express";
import { addProduct, deleteProduct, getAllProduct, getProductById } from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

//insert multer middleware that will process the multiple data (images)
productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct)
productRouter.post('/remove', adminAuth, deleteProduct)
productRouter.get('/single', getProductById)
productRouter.get('/list', getAllProduct)

export default productRouter;