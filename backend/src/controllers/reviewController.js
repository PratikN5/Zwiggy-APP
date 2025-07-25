const Review = require('../models/Review');
const Restaurant = require('../models/Restaurant');

// Add a new review to a restaurant
exports.addReview = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id; // Assumes authentication middleware sets req.user

    // Optionally, check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    const review = new Review({
      user: userId,
      restaurant: restaurantId,
      rating,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reviews for a restaurant
exports.getReviewsForRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const reviews = await Review.find({ restaurant: restaurantId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reviews by a user
exports.getReviewsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const reviews = await Review.find({ user: userId }).populate('restaurant', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
