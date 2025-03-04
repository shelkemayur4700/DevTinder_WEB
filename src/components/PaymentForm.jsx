import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { STRIPE_REDIRECT_URL } from "../utills/constants";

const PaymentForm = ({ handleCloseDialog }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    setLoading(true);
    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${STRIPE_REDIRECT_URL}/premium`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment successful!");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="p-2 text-center font-bold text-2xl">
        Complete Your Payment
      </h2>

      {/* STRIPE PAYMENT ELEMENT WITH TABS LAYOUT */}
      <PaymentElement
        options={{
          layout: "tabs",
          appearance: {
            theme: "night",
            variables: {
              colorPrimary: "#6366F1",
              colorBackground: "#1E293B",
              colorText: "#E2E8F0",
              fontSizeBase: "16px",
              borderRadius: "8px",
            },
          },
        }}
      />

      {/* BUTTONS */}
      <div className="p-4 flex justify-center">
        <button
          className="btn btn-outline btn-primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ fontWeight: "bold" }}
        >
          {loading ? "Processing..." : "Pay"}
        </button>{" "}
        <button
          className="btn btn-outline btn-secondary ml-2"
          onClick={handleCloseDialog}
          style={{ fontWeight: "bold" }}
        >
          Cancel
        </button>
      </div>

      {message && <p style={{ color: "red", padding: 10 }}>{message}</p>}
    </div>
  );
};

export default PaymentForm;
