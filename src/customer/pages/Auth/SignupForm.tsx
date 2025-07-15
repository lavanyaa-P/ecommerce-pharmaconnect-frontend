import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { sendLoginSignupOtp, signup } from '../../../State/AuthSlice';

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      otp: ""
    },
    onSubmit: (values) => {
      dispatch(signup(values));
    }
  });

  const handleSendOtp = () => {
    dispatch(
      sendLoginSignupOtp({
        email: formik.values.email,
        role: "ROLE_CUSTOMER"
      })
    );
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl pb-8" style={{ color: "#003399" }}>
        Create Account
      </h1>

      <div className="space-y-5">

        {/* Email is always shown */}
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* Only show OTP and Full Name after OTP is sent */}
        {auth.otpSent && (
          <>
            <TextField
              fullWidth
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </>
        )}

        {/* Buttons */}
        {!auth.otpSent ? (
          <Button onClick={handleSendOtp} fullWidth variant="contained" sx={{ py: "11px" }}>
            {auth.loading ? <CircularProgress size={20} /> : "Send OTP"}
          </Button>
        ) : (
          <Button onClick={() => formik.handleSubmit()} fullWidth variant="contained" sx={{ py: "11px" }}>
            {auth.loading ? <CircularProgress size={20} /> : "Create Account"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
