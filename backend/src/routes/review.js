const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth'); // Assumes you have authentication middleware

// Add a review to a restaurant
router.post('/:restaurantId', auth, reviewController.addReview);

// Get all reviews for a restaurant
router.get('/restaurant/:restaurantId', reviewController.getReviewsForRestaurant);

// Get all reviews by the logged-in user
router.get('/user/me', auth, reviewController.getReviewsByUser);

module.exports = router;
