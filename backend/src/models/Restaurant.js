const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  menu: [menuItemSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
