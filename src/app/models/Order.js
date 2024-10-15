const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    province: { type: String },
    district: { type: String },
    ward: { type: String },
    house: { type: String },
    products: { type: String },
    status: { type: String },
    createdAt: { type: Date, default: Date.now },
    userAdmin: { type: String },
    color: { type: String },
    voucher: { type: String },
});

module.exports = mongoose.model('Order', orderSchema);
