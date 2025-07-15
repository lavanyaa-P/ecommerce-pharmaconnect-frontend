import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { Button, CircularProgress, TextField } from '@mui/material';
import { sendLoginSignupOtp, signin } from '../../../State/AuthSlice';

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = useAppSelector(store => store.auth);

    const formik = useFormik({
        initialValues: {
            email: "",
            otp: ""
        },
        onSubmit: (values) => {
            dispatch(signin(values));
        }
    });

    const handleSendOtp = () => {
        dispatch(
            sendLoginSignupOtp({
                email: `signing_${formik.values.email}`,
                role: "ROLE_CUSTOMER",
            })
        );
    };

    useEffect(() => {
        if (auth.user && auth.user.email) {
            const isAdmin = auth.user.email === "pshashank412@gmail.com";

            if (isAdmin) {
                navigate("/admin/deals");
            } else {
                navigate("/");
            }
        }
    }, [auth.user, navigate]);

    return (
        <div className="py-5">
            <h1
                className="text-center font-bold text-xl pb-8"
                style={{ color: "#003399" }}
            >
                Login
            </h1>

            <div className="space-y-5 min-h-[220px]">
                <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <div className="text-xs text-gray-500">
                    <p>Live Debug Email: {formik.values.email}</p>
                </div>

                {auth.otpSent && (
                    <div className="space-y-2">
                        <p className="font-medium text-sm opacity-60">Enter OTP sent to your email</p>
                        <TextField
                            fullWidth
                            name="otp"
                            label="Otp"
                            value={formik.values.otp}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.otp && Boolean(formik.errors.otp)}
                            helperText={formik.touched.otp && formik.errors.otp}
                        />
                    </div>
                )}

                {!auth.otpSent ? (
                    <Button onClick={handleSendOtp} fullWidth variant="contained" sx={{ py: "11px" }}>
                        {auth.loading ? <CircularProgress size={20} /> : "Send OTP"}
                    </Button>
                ) : (
                    <Button onClick={() => formik.handleSubmit()} fullWidth variant="contained" sx={{ py: "11px" }}>
                        Login
                    </Button>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
