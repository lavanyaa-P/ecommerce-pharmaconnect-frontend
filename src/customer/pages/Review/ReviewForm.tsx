import React, { useState } from 'react';
import { useAppDispatch } from '../../../State/Store';
import { addReviewThunk } from '../../../State/customer/reviewSlice';
import { toast } from 'react-toastify';
import { TextField, Button, Rating } from '@mui/material';

interface ReviewFormProps {
    productId: number;
    onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSubmitted }) => {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState<number | null>(null);
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!rating) {
            toast.error("Please provide a rating");
            return;
        }

        try {
            await dispatch(
                addReviewThunk({
                    productId,
                    comment: reviewText,
                    rating,
                })
            ).unwrap();

            setReviewText('');
            setRating(null);
            toast.success("Review submitted successfully!");
            onReviewSubmitted(); // 🔁 refresh reviews
        } catch (error) {
            toast.error("Failed to submit review");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-5 space-y-4">
            <Rating
                name="rating"
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
            />
            <TextField
                fullWidth
                label="Write your review"
                multiline
                minRows={3}
                variant="outlined"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                Submit Review
            </Button>
        </form>
    );
};

export default ReviewForm;
