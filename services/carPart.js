const CarPart = require('../models/CarPart');
const { carPartViewModel } = require('./util');

async function getAllCarParts(query) {
    const options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if (query.category) {
        options.category = query.category;
    }
    if (query.from) {
        options.price = { $gte: Number(query.from) };
    }
    if (query.to) {
        if (!options.price) {
            options.price = {};
        }
        options.price.$lte = Number(query.to);
    }

    const carParts = await CarPart.find(options);
    return carParts.map(carPartViewModel);
}

async function getByIdCarPart(id) {
    const carPart = await CarPart.findById(id);
    if (carPart) {
        return carPartViewModel(carPart);
    } else {
        return undefined;
    }
}

async function createCarPart(carPart) {
    const result=new CarPart(carPart);
    await result.save();
}

async function deleteByIdCarPart(id) {
    await CarPart.findByIdAndDelete(id);
}

async function updateByIdCarPart(id,carPart) {
    const existing=await CarPart.findById(id);

    existing.name=carPart.name;
    existing.description=carPart.description;
    existing.imageUrl=carPart.imageUrl || undefined;
    existing.price=carPart.price;

    await existing.save();
}

module.exports={
    getAllCarParts,
    getByIdCarPart,
    createCarPart,
    updateByIdCarPart,
    deleteByIdCarPart,
}