import React from "react";
import { Box, Typography, Grid, Paper, Divider, CircularProgress } from "@mui/material";
import OrderTable from "../Orders/OrderTable";
import { useAppSelector } from "../../../State/Store";

const Dashboard = () => {
    const { profile, loading } = useAppSelector((store) => store.seller);

    if (loading || !profile) {
        return (
            <Box p={4} className="flex justify-center items-center h-[50vh]">
                <CircularProgress />
            </Box>
        );
    }

    const {
        sellerName,
        email,
        mobile,
        GSTIN,
        businessDetails,
        pickupAddress,
        bankDetails,
        accountStatus,
    } = profile;

    return (
        <Box p={4}>
            {/* Dashboard Heading */}
            <Typography variant="h4" gutterBottom>
                Seller Dashboard
            </Typography>

            {/* Profile Summary */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Profile Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Name:</strong> {sellerName}</Typography>
                        <Typography><strong>Email:</strong> {email}</Typography>
                        <Typography><strong>Mobile:</strong> {mobile}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Business Name:</strong> {businessDetails?.businessName}</Typography>
                        <Typography><strong>GSTIN:</strong> {GSTIN}</Typography>
                        <Typography><strong>Status:</strong> {accountStatus}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>City:</strong> {pickupAddress?.city}</Typography>
                        <Typography><strong>State:</strong> {pickupAddress?.state}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Account Holder:</strong> {bankDetails?.accountHolderName}</Typography>
                        <Typography><strong>Account No.:</strong> {bankDetails?.accountNumber}</Typography>
                        <Typography><strong>IFSC:</strong> {bankDetails?.ifscCode}</Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Order Table */}
            <Box mb={4}>
                <Typography variant="h6" gutterBottom>
                    Recent Orders
                </Typography>
                <OrderTable />
            </Box>
        </Box>
    );
};

export default Dashboard;
