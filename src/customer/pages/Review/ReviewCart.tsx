import React from "react";
import { Avatar, Box, Grid, Rating, Typography, Stack, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function ReviewCart() {
    return (
        <Grid container spacing={2} alignItems="flex-start">
            {/* Avatar */}
            <Grid item xs="auto">
                <Box>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: "#9155FD", color: "white" }}>Z</Avatar>
                </Box>
            </Grid>

            {/* Review content */}
            <Grid item xs>
                <Stack spacing={0.5}>
                    <Typography variant="subtitle1" fontWeight="600">
                        Tom
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        2025-09-27T23:16:07.478333
                    </Typography>
                    <Rating readOnly value={4.5} precision={0.5} />
                    <Typography variant="body2">Value for money product, great product</Typography>
                </Stack>
            </Grid>

            {/* Delete icon */}
            <Grid item xs="auto">
                <IconButton size="small" >
                    <Delete fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
    );
}
