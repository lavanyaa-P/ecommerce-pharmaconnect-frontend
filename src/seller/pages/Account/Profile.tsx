import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Grid,
    Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

type SectionKey = "personal" | "business" | "address" | "bank";

const Profile = () => {
    const [editing, setEditing] = useState<Record<SectionKey, boolean>>({
        personal: false,
        business: false,
        address: false,
        bank: false,
    });

    const [formData, setFormData] = useState({
        name: "John Seller",
        email: "john@example.com",
        mobile: "9876543210",
        businessName: "John's Pharmacy",
        gstin: "22ABCDE1234F1Z5",
        accountStatus: "Active",
        city: "Bangalore",
        state: "Karnataka",
        pickupMobile: "9876543210",
        accHolderName: "John Seller",
        accNumber: "1234567890",
        ifscCode: "SBIN0001234",
    });

    const handleToggleEdit = (section: SectionKey) => {
        setEditing({ ...editing, [section]: !editing[section] });
    };

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const renderField = (
        label: string,
        field: keyof typeof formData,
        editable: boolean
    ) => (
        <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                label={label}
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                InputProps={{ readOnly: !editable }}
            />
        </Grid>
    );

    return (
        <Box p={4}>
            {/* Personal Details */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Personal Details</Typography>
                    <IconButton onClick={() => handleToggleEdit("personal")}>
                        {editing.personal ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                </Box>
                <Grid container spacing={2} mt={1}>
                    {renderField("Seller Name", "name", editing.personal)}
                    {renderField("Email", "email", editing.personal)}
                    {renderField("Mobile", "mobile", editing.personal)}
                </Grid>
            </Paper>

            {/* Business Details */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Business Details</Typography>
                    <IconButton onClick={() => handleToggleEdit("business")}>
                        {editing.business ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                </Box>
                <Grid container spacing={2} mt={1}>
                    {renderField("Business Name / Brand", "businessName", editing.business)}
                    {renderField("GSTIN", "gstin", editing.business)}
                    {renderField("Account Status", "accountStatus", editing.business)}
                </Grid>
            </Paper>

            {/* Pickup Address */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Pickup Address</Typography>
                    <IconButton onClick={() => handleToggleEdit("address")}>
                        {editing.address ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                </Box>
                <Grid container spacing={2} mt={1}>
                    {renderField("City", "city", editing.address)}
                    {renderField("State", "state", editing.address)}
                    {renderField("Mobile", "pickupMobile", editing.address)}
                </Grid>
            </Paper>

            {/* Bank Details */}
            <Paper elevation={3} sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Bank Details</Typography>
                    <IconButton onClick={() => handleToggleEdit("bank")}>
                        {editing.bank ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                </Box>
                <Grid container spacing={2} mt={1}>
                    {renderField("Account Holder Name", "accHolderName", editing.bank)}
                    {renderField("Account Number", "accNumber", editing.bank)}
                    {renderField("IFSC Code", "ifscCode", editing.bank)}
                </Grid>
            </Paper>
        </Box>
    );
};

export default Profile;
