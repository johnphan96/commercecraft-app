import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentMethodScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // if not logged in, push to log in screen
  if (!userInfo) {
    props.history.push("/signin");
  }

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // if no shippingAddress, push to shipping
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div className="center">
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">
              <img
                className="small"
                src="/images/paypal_logo.png"
                alt="paypal_icon"
              />
            </label>
          </div>
        </div>
        <div>
          <div className="center">
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">
              <img
                className="small"
                src="/images/stripe_logo.png"
                alt="paypal_icon"
              />
            </label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodScreen;
