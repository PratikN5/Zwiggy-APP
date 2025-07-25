import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ restaurantId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // You may need to add auth headers here
      await axios.post(`/api/reviews/${restaurantId}`, { rating, comment });
      setComment('');
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setError('Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: 16}}>
      <h4>Leave a Review</h4>
      <label>
        Rating:
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <br />
      <label>
        Comment:
        <textarea value={comment} onChange={e => setComment(e.target.value)} required />
      </label>
      <br />
      <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Review'}</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
};

export default ReviewForm;
