import { useFormik } from 'formik';
import React from 'react'

import { useAppDispatch } from '../../../State/Store';
import { Button, TextField } from '@mui/material';
import { sendLoginSignupOtp } from '../../../State/AuthSlice';
import {signin} from '../../../State/AuthSlice'

const LoginForm = () => {

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: "", // make sure this is not preset
            otp: ""
        },
        onSubmit: (values) => {
            console.log("Form submitted with:", values);
            dispatch(signin(values))
        }
    });

    const handleSendOtp = () => {
        console.log("Sending OTP to:", formik.values.email);
        dispatch(sendLoginSignupOtp({ email: formik.values.email, role: "ROLE_CUSTOMER" }));
    };

    return (
        <div>
            <h1
                className="text-center font-bold text-xl pb-8"
                style={{ color: "#003399" }}
            >
                Login
            </h1>

            <div className="space-y-5">
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
                    <p>Live Debug Email: {formik.values.email}</p> {/* 🧪 Live Debug */}
                </div>

                {true && (
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

                <Button onClick={handleSendOtp} fullWidth variant="contained" sx={{ py: "11px" }}>
                    send OTP
                </Button>

                <Button onClick={() => formik.handleSubmit()} fullWidth variant="contained" sx={{ py: "11px" }}>
                    Login
                </Button>
            </div>

        </div>
    )
}

export default LoginForm