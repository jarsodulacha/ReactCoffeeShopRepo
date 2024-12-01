import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import './NewOrder.css';

const NewOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [items, setItems] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [price, setPrice] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      // OrderId: orderId,
      Items: items.split(","),
      CustomerName: customerName,
      Price: parseFloat(price),
      OrderStatus: orderStatus,
      PaymentStatus: paymentStatus,
    };

    // Send the new order data to the backend
    axios
      .post("/orders", newOrder)
      .then((response) => {
        alert("Order added successfully!");
        // setOrderId("");
        setItems("");
        setCustomerName("");
        setPrice("");
        setOrderStatus("");
        setPaymentStatus("");
      })
      .catch((error) => {
        console.error("Error adding order:", error);
        alert("Error adding order!");
      });
  };

  return (
    <div>
      <h3>Add New Order</h3>

      {/* Link to Home page */}
      <Link to="/">Back to Home</Link>

      <form onSubmit={handleSubmit}>
        {/* <div>
          <label>Order ID:</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div> */}
        <div>
          <label>Items (comma-separated):</label>
          <input
            type="text"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Order Status:</label>
          <input
            type="text"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Payment Status:</label>
          <input
            type="text"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
};

export default NewOrder;
