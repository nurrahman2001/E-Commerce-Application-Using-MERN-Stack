const mongoose = require("mongoose")
const { Schema } = mongoose

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1)
    },
    image: {
        type: String,
        default: null
    },
    creationAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Category", categorySchema)