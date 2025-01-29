import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//logic for login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ succes: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }

        else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}



//logic for creating users
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // cheking if the user exists
        const exists = await userModel.findOne({ email })

        if (exists) {
            return res.json({ succes: false, message: "User already exists" })
        }

        //cheking email format and strong password

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        //cheking password intégrity
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating the user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        //Storing the newly created user in the database
        const user = await newUser.save()

        //creat a token for the user
        const token = createToken(user._id)

        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ successs: false, message: error.message })
    }
}

const adminLogin = async (req, res) => {

    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { adminLogin, loginUser, registerUser };

