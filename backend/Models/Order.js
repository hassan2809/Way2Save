const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    cart: [
        {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalCost: {
        type: Number,
        required: true
    },
})

const OrderModel = mongoose.model("orders", OrderSchema)

module.exports = OrderModel;