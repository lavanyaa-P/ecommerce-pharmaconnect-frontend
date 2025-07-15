import React from "react";
import { Button, TextField } from '@mui/material';
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { sellerLogin } from "../../../State/seller/sellerAuthSlice";
import { sendLoginSignupOtp } from "../../../State/AuthSlice";
import { useNavigate } from "react-router-dom";

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((store) => store.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: ""
    },
    onSubmit: (values) => {
      console.log("Form submitted with:", values);

      dispatch(sellerLogin({ email: values.email, otp: values.otp }))
        .unwrap()
        .then(() => {
          navigate("/seller/products");
        })
        .catch((err) => {
          console.error('Login failed:', err);
        });
    }
  });

  const handleSendOtp = () => {
    console.log("Sending OTP to:", formik.values.email);
    dispatch(
      sendLoginSignupOtp({
        email: `signing_${formik.values.email}`,
        role: "ROLE_SELLER",
      })
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-center font-bold text-primary-color pb-5">Login As A Seller</h1>
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

        <Button onClick={handleSendOtp} fullWidth variant="contained" sx={{ py: "11px" }}>
          send OTP
        </Button>

        <Button type="submit" fullWidth variant="contained" sx={{ py: "11px" }}>
          Login
        </Button>
      </div>
    </form>
  );
};

export default SellerLoginForm;
