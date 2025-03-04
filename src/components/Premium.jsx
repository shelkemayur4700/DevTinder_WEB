import React, { useState } from "react";
import PaymentModal from "./Paymentmodel";
import { useSelector } from "react-redux";

const Premium = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const payment_intent = urlParams.get("payment_intent");
  const redirect_status = urlParams.get("redirect_status");

  const { membershipType, isPremium } = useSelector((state) => state.user);


  const [isOpen, setIsOpen] = useState(false);
  const [planData, setPlanData] = useState({
    amount: 0,
    plan: "",
  });

  return (
    <div className="p-2">
      {/* Payment Modal */}
      {isOpen && (
        <PaymentModal
          open={isOpen}
          handleClose={() => setIsOpen(false)}
          amount={planData.amount}
          plan={planData.plan}
        />
      )}

      {/* Show Membership Details if User is Premium */}
      {isPremium ? (
        <div className="flex w-full p-4">
          <div className="card bg-neutral rounded-box grid h-80 flex-grow place-items-center">
            <h1 className="font-bold text-3xl">{membershipType} Membership</h1>
            <ul>
              {membershipType === "Silver" ? (
                <>
                  <li> - Chat with people 10/day</li>
                  <li> - 100 connections requests/day</li>
                  <li> - Blue Tick for 3 Months</li>
                  <li> - ₹300/month</li>
                </>
              ) : (
                <>
                  <li> - Unlimited Chat with people</li>
                  <li> - Infinite connections requests/day</li>
                  <li> - Blue Tick for 6 Months</li>
                  <li> - ₹3000/month</li>
                </>
              )}
            </ul>
            <h2 className="text-xl font-semibold text-green-700">
              ✅ You are a {membershipType} Member!
            </h2>
          </div>
        </div>
      ) : (
        // Show Membership Plans if Not Premium
        <div className="flex w-full p-4">
          <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
            <h1 className="font-bold text-3xl">Silver Membership</h1>
            <ul>
              <li> - Chat with people 10/day</li>
              <li> - 100 connections requests/day</li>
              <li> - Blue Tick for 3 Months</li>
              <li> - ₹300/month</li>
            </ul>
            <button
              className="btn btn-outline btn-secondary"
              onClick={() => {
                setIsOpen(true);
                setPlanData({ amount: 300, plan: "Silver" });
              }}
            >
              Buy Silver
            </button>
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
            <h1 className="font-bold text-3xl">Gold Membership</h1>
            <ul>
              <li> - Unlimited Chat with people</li>
              <li> - Infinite connections requests/day</li>
              <li> - Blue Tick for 6 Months</li>
              <li> - ₹3000/month</li>
            </ul>
            <button
              className="btn btn-outline btn-primary"
              onClick={() => {
                setIsOpen(true);
                setPlanData({ amount: 3000, plan: "Gold" });
              }}
            >
              Buy Gold
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium;
