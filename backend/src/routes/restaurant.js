const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Sample data for demo
const sampleRestaurants = [
  {
    _id: '1',
    name: 'Pizza Palace',
    address: '123 Main St, City Center',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    reviews: [
      { user: 'Amit', comment: 'Best pizza in town!', stars: 5 },
      { user: 'Priya', comment: 'Loved the Margherita.', stars: 4 }
    ],
    menu: [
      { name: 'Margherita Pizza', price: 299, description: 'Classic cheese and tomato pizza.' },
      { name: 'Pepperoni Pizza', price: 349, description: 'Pepperoni, cheese, and tomato.' }
    ]
  },
  {
    _id: '2',
    name: 'Burger Hub',
    address: '456 Burger Lane, Downtown',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
    rating: 4.2,
    reviews: [
      { user: 'Rahul', comment: 'Juicy burgers and quick delivery.', stars: 5 },
      { user: 'Sara', comment: 'Veggie burger was okay.', stars: 3 }
    ],
    menu: [
      { name: 'Veggie Burger', price: 199, description: 'Grilled veggie patty with lettuce and tomato.' },
      { name: 'Chicken Burger', price: 249, description: 'Crispy chicken patty with mayo.' }
    ]
  },
  {
    _id: '3',
    name: 'Sushi World',
    address: '789 Sushi Ave, Uptown',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    reviews: [
      { user: 'Meena', comment: 'Fresh and delicious sushi!', stars: 5 },
      { user: 'John', comment: 'Loved the California roll.', stars: 5 }
    ],
    menu: [
      { name: 'California Roll', price: 399, description: 'Crab, avocado, and cucumber.' },
      { name: 'Salmon Nigiri', price: 499, description: 'Fresh salmon over rice.' }
    ]
  },
  {
    _id: '4',
    name: 'Tandoori Treats',
    address: '321 Spice Rd, Old Town',
    image: 'https://images.unsplash.com/photo-1504674900247-ec6b0b4783e4?auto=format&fit=crop&w=400&q=80',
    rating: 4.0,
    reviews: [
      { user: 'Vikram', comment: 'Paneer tikka was amazing!', stars: 4 },
      { user: 'Anjali', comment: 'Good tandoori chicken.', stars: 4 }
    ],
    menu: [
      { name: 'Paneer Tikka', price: 299, description: 'Grilled paneer with spices.' },
      { name: 'Chicken Tandoori', price: 349, description: 'Classic tandoori chicken.' }
    ]
  }
];

// GET all restaurants (with images)
router.get('/', (req, res) => {
  res.json(sampleRestaurants);
});

// GET single restaurant by id (with menu)
router.get('/:id', (req, res) => {
  const restaurant = sampleRestaurants.find(r => r._id === req.params.id);
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
  res.json(restaurant);
});

// GET menu for a restaurant (legacy route)
router.get('/:id/menu', (req, res) => {
  const restaurant = sampleRestaurants.find(r => r._id === req.params.id);
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
  res.json(restaurant.menu);
});

module.exports = router;
