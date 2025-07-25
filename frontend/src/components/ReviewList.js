import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ restaurantId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/restaurant/${restaurantId}`);
        setReviews(res.data);
      } catch (err) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [restaurantId]);

  if (loading) return <div>Loading reviews...</div>;
  if (!reviews.length) return <div>No reviews yet.</div>;

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id} style={{borderBottom: '1px solid #eee', marginBottom: 8, paddingBottom: 8}}>
          <strong>{review.user?.name || 'Anonymous'}</strong> <span>({review.rating}/5)</span>
          <div>{review.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
