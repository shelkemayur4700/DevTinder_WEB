import axios from "axios";
import React, { useEffect, useState } from "react";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BASE_URL } from "../utills/constants";

const stripeUrl = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
const stripePromise = loadStripe(stripeUrl);

const PaymentModal = ({ open, handleClose, amount, plan }) => {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/payment/create`,
          { amount: amount, membershipType: plan },
          { withCredentials: true }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    if (open) {
      fetchClientSecret();
    }
  }, [open]);

  return (
    <dialog id="payment_modal" className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box">
        {!clientSecret ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>{" "}
          </div>
        ) : (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: { theme: "night" },
            }}
          >
            <PaymentForm handleCloseDialog={handleClose} />
          </Elements>
        )}
      </div>
    </dialog>
  );
};

export default PaymentModal;
