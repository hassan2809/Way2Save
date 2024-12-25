const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    category: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    image_url: {
        type: Number,
    }
})

const ProducModel = mongoose.model("products", ProductSchema)

module.exports = ProducModel;