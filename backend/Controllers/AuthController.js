const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const UserModel = require("../Models/User");
const RoomListingModel = require("../Models/RoomListing");
const TourModel = require("../Models/Tour");
const ProducModel = require("../Models/Products");
const OrderModel = require("../Models/Order");
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNTS_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM;
const whatsappTo = process.env.TWILIO_WHATSAPP_TO;

const client = require('twilio')(accountSid, authToken);

const signup = async (req, res) => {
    try {
        // console.log("signup VVV")
        const { fullName, email, confirmPassword } = req.body;
        // console.log("confirm password is",confirmPassword)
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User is already exists.", success: false })
        }

        const userModel = new UserModel({ name: fullName, email, password: confirmPassword })
        userModel.password = await bcrypt.hash(confirmPassword, 10)
        await userModel.save()
        res.status(201).json({ message: "Signup Successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        // console.log("signup VVV")
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "User not exists.Authentication Failed!!!", success: false })
        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(403).json({ message: "Password is wrong.Authentication Failed!!!", success: false })
        }

        const jwtToken = jwt.sign({ email: user.email, _id: user._id },
            process.env.JWT_ENCRYPT,
            { expiresIn: "24h" }
        )

        res.status(201).json({ message: "Login Successfully", success: true, jwtToken, email, name: user.name })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const filterRoomListings = async (req, res) => {
    try {
        const { minPrice, maxPrice, roomType, location, furnished } = req.body;
        // console.log(req.body)
        const query = {};
        if (minPrice > 0) {
            query.price = { $gte: 0, $lte: minPrice }
        }
        if (roomType && roomType != 'any') {
            query.roomType = roomType.toLowerCase();
        }
        if (location) {
            query.location = new RegExp(location, "i");
        }
        if (furnished && furnished != 'any') {
            query.furnished = furnished.toLowerCase();
        }

        // console.log("querry is:", query)

        const listings = await RoomListingModel.find(query);
        res.status(200).json({ data: listings, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        // console.log(error)
    }
}
const fetchUserDetails = async (req, res) => {
    try {
        // console.log(req)
        res.status(200).json({
            message: "Fetch User details...",
            name: req.user.name,
            email: req.user.email,
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
    }
}
const updateUserDetails = async (req, res) => {
    try {
        // console.log(req.user)
        // console.log("updateUserDetails")
        const { name, email, currentPassword, newPassword } = req.body;
        // console.log(newPassword)
        const userId = req.user._id;
        // console.log(userId)
        const user = await UserModel.findById(userId);
        // console.log(user)
        if (currentPassword && newPassword) {
            const passwordCheck = await bcrypt.compare(currentPassword, user.password)
            // console.log(passwordCheck)
            if (!passwordCheck) {
                return res.status(403).json({ message: "Current Password is wrong.", success: false })
            }
            user.password = await bcrypt.hash(newPassword, 10)
        }
        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        res.status(200).json({ message: 'User details updated successfully', success: "true" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
    }
}
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email })
        // console.log(user)
        if (!user) {
            return res.status(403).json({ message: "User not exists.Authentication Failed!!!", success: false })
        }

        const jwtToken = jwt.sign({ _id: user._id },
            process.env.JWT_ENCRYPT,
            { expiresIn: "24h" }
        )

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email || 'fa21-bse-069@cuilahore.edu.pk',
            subject: 'Reset Your Password - Action Required',
            // text: `http://localhost:5173/resetPassword/${user._id}/${jwtToken}`
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50;">Reset Your Password</h2>
            <p>Hi ${user.name || 'User'},</p>
            <p>We received a request to reset your password. You can reset it by clicking the button below:</p>
            <a href="http://localhost:5173/resetPassword/${user._id}/${jwtToken}" 
                style="display: inline-block; padding: 10px 15px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
                Reset Password
            </a>
            <p>If you didn’t request this, please ignore this email. Your password will remain unchanged.</p>
            <p>Thanks, <br>The Team</p>
            </div>
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json({ message: 'Reset Password link is send on the email.', success: "true" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
    }
}
const resetPassword = async (req, res) => {
    try {
        // console.log(req)
        // console.log(req.body)
        const { id, token } = req.params
        const { confirmPassword } = req.body

        if (!id || !token) {
            return res.status(400).json({ message: "Invalid request data", success: false });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_ENCRYPT);
        } catch (err) {
            return res.status(400).json({ message: "Invalid or expired token", success: false });
        }

        const user = await UserModel.findById(id);
        user.password = await bcrypt.hash(confirmPassword, 10)
        await user.save()
        res.status(200).json({ message: 'Password reset successfully.', success: "true" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
    }
}
const getProducts = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await ProducModel.find({ category: category });

        if (products.length === 0) {
            return res.status(404).json({ message: `No products found in the ${category} category.` });
        }

        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
    }
}

const postOrder = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, email, address, paymentMethod, cart, totalCost, number } = req.body;
        const orderNumber = Math.floor(100000 + Math.random() * 900000);
        const newOrder = new OrderModel({
            name,
            email,
            address,
            paymentMethod,
            cart,
            totalCost,
            number,
            orderNumber
        });
        await newOrder.save();

        const orderDetails = `
        New Order Received!
        Order Number: ${orderNumber}
        Name: ${name}
        Email: ${email}
        Contact Number: ${number}
        Address: ${address}
        Payment Method: ${paymentMethod}
        Total Cost: £${totalCost.toFixed(2)}

        Items:
        ${cart.map(item => `  - ${item.title} (${item.quantity} Kg): £${(item.price * item.quantity).toFixed(2)}`).join('\n')}
        `;

        client.messages.create({
            from: whatsappFrom,
            to: whatsappTo,
            body: orderDetails
        })
            .then(message => console.log(message.sid))
            .catch(error => console.error(`Failed to send message: ${error.message}`));


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: 'waysavebutchers@gmail.com',
            subject: 'New Order Received - Order Details',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #4CAF50; text-align: center;">Order Details</h2>
                    <p><strong>Order Number:</strong> ${orderNumber}</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Contact Number:</strong> ${number}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                    <p><strong>Total Cost:</strong> £${totalCost.toFixed(2)}</p>
                    <h3>Items:</h3>
                    <ul>
                        ${cart.map(item => `<li>${item.title} (${item.quantity} Kg): £${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
                    </ul>
                </div>
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({ success: true, message: 'Order placed successfully!' });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
    }
}


module.exports = {
    signup, login, filterRoomListings, fetchUserDetails, updateUserDetails, forgotPassword, resetPassword, getProducts, postOrder
}