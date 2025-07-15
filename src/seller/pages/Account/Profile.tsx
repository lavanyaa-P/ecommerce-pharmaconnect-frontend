import React, { useState, useEffect } from "react";
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
import { useAppSelector } from "../../../State/Store";

type SectionKey = "personal" | "business" | "address" | "bank";

const Profile = () => {
  const { seller } = useAppSelector((state) => state.sellerAuth);

  const [editing, setEditing] = useState<Record<SectionKey, boolean>>({
    personal: false,
    business: false,
    address: false,
    bank: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    businessName: "",
    gstin: "",
    accountStatus: "",
    city: "",
    state: "",
    pickupMobile: "",
    accHolderName: "",
    accNumber: "",
    ifscCode: "",
  });

  useEffect(() => {
    if (seller) {
      setFormData({
        name: seller.sellerName || "",
        email: seller.email || "",
        mobile: seller.mobile || "",
        businessName: seller.businessDetails?.businessName || "",
        gstin: seller.GSTIN || "",
        accountStatus: seller.accountStatus || "Active",
        city: seller.pickupAddress?.city || "",
        state: seller.pickupAddress?.state || "",
        pickupMobile: seller.pickupAddress?.mobile || "",
        accHolderName: seller.bankDetails?.accountHolderName || "",
        accNumber: seller.bankDetails?.accountNumber || "",
        ifscCode: seller.bankDetails?.ifscCode || "",
      });
    }
  }, [seller]);

  const handleToggleEdit = (section: SectionKey) => {
    setEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
          {renderField("Business Name", "businessName", editing.business)}
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
