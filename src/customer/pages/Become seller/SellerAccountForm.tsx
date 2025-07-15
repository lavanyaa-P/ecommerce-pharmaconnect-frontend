import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

import { useAppDispatch } from "../../../State/Store"; // Make sure this is the correct path
import { registerSeller } from "../../../State/seller/sellerSlice";

const steps = ["Tax Details & Mobile", "Pickup Address", "Bank Details", "Supplier details"];

const SellerAccountForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            mobile: "",
            otp: "",
            gstin: "",
            pickupAddress: {
                name: "",
                mobile: "",
                pincode: "",
                address: "",
                locality: "",
                city: "",
                state: ""
            },
            bankDetails: {
                accountNumber: "",
                ifscCode: "",
                accountHolderName: ""
            },
            sellerName: "",
            email: "",
            businessDetails: {
                businessName: "",
                businessEmail: "",
                businessMobile: "",
                logo: "",
                banner: "",
                businessAddress: ""
            },
            password: ""
        },
        onSubmit: (values) => {
            // Optional: you can call this directly instead of using handleCreateAccount
        }
    });

    const handleCreateAccount = () => {
        console.log("Creating seller account...");

        const sellerPayload = {
            mobile: formik.values.mobile,
            gstin: formik.values.gstin,
            pickupAddress: formik.values.pickupAddress,
            bankDetails: formik.values.bankDetails,
            sellerName: formik.values.sellerName,
            email: formik.values.email,
            password: formik.values.password,
            businessDetails: formik.values.businessDetails,
        };

        dispatch(registerSeller(sellerPayload));
    };

    const handleStep = (value: number) => () => {
        if (activeStep < steps.length - 1 || (activeStep > 0 && value === -1)) {
            setActiveStep(activeStep + value);
        } else if (activeStep === steps.length - 1) {
            handleCreateAccount();
        }
    };

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <section className="mt-20 space-y-10">
                <div>
                    {activeStep === 0 ? (
                        <BecomeSellerFormStep1 formik={formik} />
                    ) : activeStep === 1 ? (
                        <BecomeSellerFormStep2 formik={formik} />
                    ) : activeStep === 2 ? (
                        <BecomeSellerFormStep3 formik={formik} />
                    ) : activeStep === 3 ? (
                        <BecomeSellerFormStep4 formik={formik} />
                    ) : (
                        ""
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <Button
                        onClick={handleStep(-1)}
                        variant="contained"
                        disabled={activeStep === 0}
                    >
                        Back
                    </Button>
                    <Button onClick={handleStep(1)} variant="contained">
                        {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default SellerAccountForm;
