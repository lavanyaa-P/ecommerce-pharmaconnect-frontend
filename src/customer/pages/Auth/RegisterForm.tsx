import { useFormik } from 'formik';
import React from 'react';
import { sendLoginSignupOtp, signup } from '../../../State/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { Button, TextField, CircularProgress } from '@mui/material';

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
            fullName: ""
        },
        onSubmit: (values) => {
            dispatch(signup(values));
        }
    });

    const handleSendOtp = () => {
        dispatch(sendLoginSignupOtp({
            email: formik.values.email,
            role: "ROLE_CUSTOMER"
        }));
    };

    return (
        <div className="py-5">
            <h1 className="text-center font-bold text-xl pb-8" style={{ color: "#003399" }}>
                Signup
            </h1>

            <div className="space-y-5 min-h-[220px]">
                <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <div className="text-xs text-gray-500">
                    <p>Live Debug Email: {formik.values.email}</p>
                </div>

                {auth.otpSent && (
                    <div className="space-y-3">
                        <div className='space-y-5'>
                            <p className="font-medium text-sm opacity-60">Enter OTP sent to your email</p>
                            <TextField
                                fullWidth
                                name="otp"
                                label="OTP"
                                value={formik.values.otp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <TextField
                            fullWidth
                            name="fullName"
                            label="Full Name"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                )}

                {!auth.otpSent && (
                    <Button onClick={handleSendOtp} fullWidth variant="contained" sx={{ py: "11px" }}>
                        {auth.loading ? <CircularProgress size={20} /> : "Send OTP"}
                    </Button>
                )}

                {auth.otpSent && (
                    <Button onClick={() => formik.handleSubmit()} fullWidth variant="contained" sx={{ py: "11px" }}>
                        {auth.loading ? <CircularProgress size={20} /> : "Signup"}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default RegisterForm;
