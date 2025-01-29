
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// global variables
const currency = 'cad'
const deliverCharges = 10

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing order using cod method
const placedOrderCod = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        //clear the cart data after order placed

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ code: 200, success: true, message: "Order placed successfully" })

    } catch (error) {
        console.log(error)
        res.json({ code: 500, success: false, message: error.message })
    }
}

//placing order using Stripe method
const placedOrderStripe = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        //send item name and quantity to stripe session
        const line_items = items.map((item, index) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        //send delivery charge to stripe session
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliverCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ code: 500, success: false, message: error.message })
    }
}

//Verify Stripe payments
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.json({ code: 500, success: false, message: error.message })
    }
}

//placing order using razorpay method
const placedOrderRazorpay = async (req, res) => {

}

// All Orders data for Admin Panel
const allOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ code: 500, success: false, message: error.message })
    }
}

// User Orders data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ code: 500, success: false, message: error.message })
    }
}

// update Orders status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status updated successfully' })
    } catch (error) {
        console.log(error)
        res.json({ code: 500, success: false, message: error.message })
    }
}

export { allOrder, placedOrderCod, placedOrderRazorpay, placedOrderStripe, updateStatus, userOrders, verifyStripe };

