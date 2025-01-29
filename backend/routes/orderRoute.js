import express from "express";
import { allOrder, placedOrderCod, placedOrderRazorpay, placedOrderStripe, updateStatus, userOrders, verifyStripe } from '../controllers/orderController.js';
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/userAuth.js";

const orderRouter = express.Router()

//Routes for the admin only
orderRouter.post('/list', adminAuth, allOrder)
orderRouter.post('/status', adminAuth, updateStatus)

//routes for payment features
orderRouter.post('/place', authUser, placedOrderCod)
orderRouter.post('/stripe', authUser, placedOrderStripe)
orderRouter.post('/razorpay', authUser, placedOrderRazorpay)

//routes for user features
orderRouter.post('/usersorders', authUser, userOrders)

//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter