import React from "react";
import { Avatar, Box, Grid, Rating, Typography, Stack, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Review } from "../../../types/reviewType";


interface Props {
    review: Review;
}

export default function ReviewCart({ review }: Props) {
    const handleDelete = () => {
        // Add dispatch logic for deleteReview here if needed
    };

    return (
        <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs="auto">
                <Box>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: "#9155FD", color: "white" }}>
                        {review.user?.name?.charAt(0)}
                    </Avatar>
                </Box>
            </Grid>

            <Grid item xs>
                <Stack spacing={0.5}>
                    <Typography variant="subtitle1" fontWeight="600">
                        {review.user?.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {new Date(review.createdAt).toLocaleString()}
                    </Typography>
                    <Rating readOnly value={review.rating} precision={0.5} />
                    <Typography variant="body2">{review.reviewText}</Typography>
                </Stack>
            </Grid>

            <Grid item xs="auto">
                <IconButton size="small" onClick={handleDelete}>
                    <Delete fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
    );
}
