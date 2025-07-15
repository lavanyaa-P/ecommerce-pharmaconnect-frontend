import React from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(to right, #e6f0ff, #f4f8ff)", // light blue bg
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "30px",
            }}
        >
            <CheckCircleOutline
                style={{ fontSize: 110, color: "#003399", marginBottom: "20px" }}
            />
            <h1
                style={{
                    fontSize: "30px",
                    color: "#003399",
                    marginBottom: "10px",
                    fontWeight: "700",
                }}
            >
                Woohoo! Order Confirmed 🎉
            </h1>
            <p
                style={{
                    fontSize: "18px",
                    color: "#333",
                    marginBottom: "40px",
                    textAlign: "center",
                    maxWidth: "420px",
                }}
            >
                Thank you for your purchase. Your order will arrive in approximately{" "}
                <strong>15 minutes</strong>. We appreciate your trust in us 💙
            </p>

            <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{
                    backgroundColor: "#003399",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontSize: "16px",
                    "&:hover": {
                        backgroundColor: "#002877",
                    },
                }}
            >
                Back to Home
            </Button>
        </div>
    );
};

export default OrderConfirmation;
