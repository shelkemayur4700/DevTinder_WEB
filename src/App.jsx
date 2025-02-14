import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import store from "./redux/store";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import PrivacyPolicy from "./components/FooterCompo/PrivacyPolicy";
import RefundPolicy from "./components/FooterCompo/RefundPolicy";
import ShippingPolicy from "./components/FooterCompo/ShippingPolicy";
import TermsConditions from "./components/FooterCompo/TermsConditions";
import ContactUs from "./components/FooterCompo/ContactUs";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
              <Route path="/refundPolicy" element={<RefundPolicy />} />
              <Route path="/shippingPolicy" element={<ShippingPolicy />} />
              <Route path="/termsConditions" element={<TermsConditions />} />
              <Route path="/contactUs" element={<ContactUs />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
