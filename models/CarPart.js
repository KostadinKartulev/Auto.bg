const { Schema, model } = require('mongoose');

const carPartSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: 'noImage.jpg' },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
})

const CarPart = model('CarPart', carPartSchema);

module.exports = CarPart;