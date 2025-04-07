import React, { useState } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';

const AddReviewForm = ({ tutorId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API = import.meta.env.VITE_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      setError('Please write a comment');
      return;
    }

    setIsSubmitting(true);

    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || !currentUser.token) {
        setError('Please log in to submit a review');
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        `${API}/api/reviews`,
        {
          tutorId,
          rating,
          comment,
        },
        {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`,
          },
        }
      );

      setSuccess('Your review has been submitted successfully!');
      setRating(0);
      setComment('');

      // Call the callback to refresh reviews in the parent component
      if (onReviewAdded) {
        onReviewAdded(response.data);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 p-6">
      <h2 className="text-xl font-bold text-[#14274E] mb-4">Leave a Review</h2>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 mb-4 bg-green-50 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-[#394867] mb-2">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`cursor-pointer ${
                  star <= (hoverRating || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
                onClick={() => !isSubmitting && setRating(star)}
                onMouseEnter={() => !isSubmitting && setHoverRating(star)}
                onMouseLeave={() => !isSubmitting && setHoverRating(0)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[#394867] mb-2">Comment</label>
          <textarea
            className="w-full p-3 border border-[#F1F6F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14274E] min-h-32"
            placeholder="Share your experience with this tutor..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSubmitting}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#14274E] hover:bg-[#394867] text-white py-2 px-4 rounded-full transition disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;