"use client"
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { instance } from '@/api/instance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

interface Review {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

const ReviewList = () => {
  const params = useParams();
  const mentorId = params?.id;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();

  // Fixed 5-star rating (non-interactive)
  const fixedRating = 5;

  // Fetch existing reviews
  const { data: reviewsResponse, isLoading } = useQuery({
    queryFn: () => instance.get(`/mentors/${mentorId}/reviews`),
    queryKey: ['mentor-reviews', mentorId],
    enabled: !!mentorId
  });

  // Submit new review mutation (with fixed 5-star rating)
  const { mutate: submitReview, isPending: isSubmitting } = useMutation({
    mutationFn: (reviewData: { rating: number; comment: string }) => 
      instance.post(`/mentors/${mentorId}/reviews`, reviewData),
    mutationKey: ['submit-review'],
    onSuccess: () => {
      toast.success('Review submitted successfully!');
      setShowReviewForm(false);
      setNewComment('');
      queryClient.invalidateQueries({ queryKey: ['mentor-reviews', mentorId] });
      queryClient.invalidateQueries({ queryKey: ['mentors', mentorId] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to submit review');
    }
  });

  const reviews: Review[] = reviewsResponse?.data?.data || [];

  const handleSubmitReview = () => {
    if (newComment.trim() === '') {
      toast.error('Please enter a comment');
      return;
    }
    // Always submit with 5-star rating
    submitReview({ rating: fixedRating, comment: newComment });
  };

  if (isLoading) {
    return (
      <div className="min-h-48 flex justify-center items-center">
        <div className="text-gray-500">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Review Button */}
      {!showReviewForm && (
        <div className="text-center">
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Your Review
          </button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Rate this Mentor</h3>
          
          {/* Static 5-star rating (non-interactive) */}
          <div className="flex items-center mb-4">
            <span className="mr-3 font-medium">Rating:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className="text-yellow-500 text-2xl mx-1" // Static yellow stars
                />
              ))}
            </div>
            <span className="ml-3 font-semibold text-blue-600">
              {fixedRating}.0/5.0
            </span>
          </div>

          {/* Comment Textarea */}
          <div className="mb-4">
            <label htmlFor="comment" className="block font-medium mb-2">
              Your Review
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience with this mentor..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSubmitReview}
              disabled={isSubmitting}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              onClick={() => setShowReviewForm(false)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="min-h-48 flex flex-col justify-center items-center text-gray-400">
          <div className="text-lg font-medium mb-2">No Reviews Yet</div>
          <div className="text-sm">Be the first to share your experience!</div>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="border-b pb-6 last:border-b-0">
              <div className="flex gap-4">
                <img
                  src={review.userId.profileImage || '/images/profile.jpg'}
                  alt={`${review.userId.firstName} ${review.userId.lastName}`}
                  className="rounded-full w-12 h-12 object-cover border"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-gray-900">
                        {review.userId.firstName} {review.userId.lastName}
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`text-sm ${
                                star <= review.rating ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {review.rating}.0/5.0
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;







// "use client"
// import React, { useState } from 'react';
// import { FaStar } from 'react-icons/fa';
// import { instance } from '@/api/instance';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import { useParams } from 'next/navigation';

// interface Review {
//   _id: string;
//   userId: {
//     firstName: string;
//     lastName: string;
//     profileImage?: string;
//   };
//   rating: number;
//   comment: string;
//   createdAt: string;
// }

// const ReviewList = () => {
//   const params = useParams();
//   const mentorId = params?.id;
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [newRating, setNewRating] = useState(5); // Default 5-star rating
//   const [newComment, setNewComment] = useState('');
//   const queryClient = useQueryClient();

//   // Fetch existing reviews
//   const { data: reviewsResponse, isLoading } = useQuery({
//     queryFn: () => instance.get(`/mentors/${mentorId}/reviews`),
//     queryKey: ['mentor-reviews', mentorId],
//     enabled: !!mentorId
//   });

//   // Submit new review mutation
//   const { mutate: submitReview, isPending: isSubmitting } = useMutation({
//     mutationFn: (reviewData: { rating: number; comment: string }) => 
//       instance.post(`/mentors/${mentorId}/reviews`, reviewData),
//     mutationKey: ['submit-review'],
//     onSuccess: () => {
//       toast.success('Review submitted successfully!');
//       setShowReviewForm(false);
//       setNewRating(5);
//       setNewComment('');
//       queryClient.invalidateQueries({ queryKey: ['mentor-reviews', mentorId] });
//       queryClient.invalidateQueries({ queryKey: ['mentors', mentorId] });
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message || 'Failed to submit review');
//     }
//   });

//   const reviews: Review[] = reviewsResponse?.data?.data || [];

//   const handleSubmitReview = () => {
//     if (newComment.trim() === '') {
//       toast.error('Please enter a comment');
//       return;
//     }
//     submitReview({ rating: newRating, comment: newComment });
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-48 flex justify-center items-center">
//         <div className="text-gray-500">Loading reviews...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Add Review Button */}
//       {!showReviewForm && (
//         <div className="text-center">
//           <button
//             onClick={() => setShowReviewForm(true)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//           >
//             Add Your Review
//           </button>
//         </div>
//       )}

//       {/* Review Form */}
//       {showReviewForm && (
//         <div className="bg-gray-50 p-6 rounded-lg border">
//           <h3 className="text-lg font-semibold mb-4">Rate this Mentor</h3>
          
//           {/* Star Rating */}
//           <div className="flex items-center mb-4">
//             <span className="mr-3 font-medium">Your Rating:</span>
//             <div className="flex">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <FaStar
//                   key={star}
//                   className={`cursor-pointer text-2xl mx-1 transition-transform hover:scale-110 ${
//                     star <= newRating ? 'text-yellow-500' : 'text-gray-300'
//                   }`}
//                   onClick={() => setNewRating(star)}
//                   onMouseEnter={() => setNewRating(star)}
//                 />
//               ))}
//             </div>
//             <span className="ml-3 font-semibold text-blue-600">
//               {newRating}.0/5.0
//             </span>
//           </div>

//           {/* Comment Textarea */}
//           <div className="mb-4">
//             <label htmlFor="comment" className="block font-medium mb-2">
//               Your Review
//             </label>
//             <textarea
//               id="comment"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Share your experience with this mentor..."
//               className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               rows={4}
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3">
//             <button
//               onClick={handleSubmitReview}
//               disabled={isSubmitting}
//               className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit Review'}
//             </button>
//             <button
//               onClick={() => setShowReviewForm(false)}
//               className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Reviews List */}
//       {reviews.length === 0 ? (
//         <div className="min-h-48 flex flex-col justify-center items-center text-gray-400">
//           <div className="text-lg font-medium mb-2">No Reviews Yet</div>
//           <div className="text-sm">Be the first to share your experience!</div>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {reviews.map((review) => (
//             <div key={review._id} className="border-b pb-6 last:border-b-0">
//               <div className="flex gap-4">
//                 <img
//                   src={review.userId.profileImage || '/images/profile.jpg'}
//                   alt={`${review.userId.firstName} ${review.userId.lastName}`}
//                   className="rounded-full w-12 h-12 object-cover border"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <div className="font-medium text-gray-900">
//                         {review.userId.firstName} {review.userId.lastName}
//                       </div>
//                       <div className="flex items-center mt-1">
//                         <div className="flex">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <FaStar
//                               key={star}
//                               className={`text-sm ${
//                                 star <= review.rating ? 'text-yellow-500' : 'text-gray-300'
//                               }`}
//                             />
//                           ))}
//                         </div>
//                         <span className="ml-2 text-sm text-gray-600">
//                           {review.rating}.0/5.0
//                         </span>
//                       </div>
//                     </div>
//                     <span className="text-xs text-gray-500">
//                       {new Date(review.createdAt).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </span>
//                   </div>
//                   <p className="text-gray-700 text-sm leading-relaxed">
//                     {review.comment}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewList;