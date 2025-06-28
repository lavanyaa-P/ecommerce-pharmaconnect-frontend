import React from "react";
import { Box, Typography, Grid, Paper, Divider } from "@mui/material";
import OrderTable from "../Orders/OrderTable"; // Adjust path if needed
import TransactionTable from "../Payment/TransactionTable"; // Adjust path if needed
import Profile from "../Account/Profile"; // Adjust path if needed

const Dashboard = () => {
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
                        <Typography><strong>Name:</strong> John Seller</Typography>
                        <Typography><strong>Email:</strong> john@example.com</Typography>
                        <Typography><strong>Mobile:</strong> 9876543210</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Business Name:</strong> John's Pharmacy</Typography>
                        <Typography><strong>GSTIN:</strong> 22ABCDE1234F1Z5</Typography>
                        <Typography><strong>Status:</strong> Active</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>City:</strong> Bangalore</Typography>
                        <Typography><strong>State:</strong> Karnataka</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography><strong>Account Holder:</strong> John Seller</Typography>
                        <Typography><strong>Account No.:</strong> 1234567890</Typography>
                        <Typography><strong>IFSC:</strong> SBIN0001234</Typography>
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

            {/* Transaction Table */}
            <Box mb={4}>
                <Typography variant="h6" gutterBottom>
                    Recent Transactions
                </Typography>
                <TransactionTable />
            </Box>
        </Box>
    );
};

export default Dashboard;
