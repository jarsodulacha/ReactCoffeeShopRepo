import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  // Fetch orders from the backend
  useEffect(() => {
    axios
      .get("/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // Update OrderStatus by ID
  const updateOrderStatus = (e) => {
    e.preventDefault();
    axios
      .put(`/orders/${orderId}`, { OrderStatus: orderStatus })
      .then((response) => {
        alert(response.data.message);
        setOrderStatus("");
        setOrderId("");
        // Refresh orders
        return axios.get("/orders");
      })
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error updating order status:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Management</h1>

      <h2>Orders</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>OrderId</th>
            <th>Items</th>
            <th>CustomerName</th>
            <th>Price</th>
            <th>OrderStatus</th>
            <th>PaymentStatus</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.OrderId}</td>
              <td>{order.Items.join(", ")}</td>
              <td>{order.CustomerName}</td>
              <td>${order.Price.toFixed(2)}</td>
              <td>{order.OrderStatus}</td>
              <td>{order.PaymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Update Order Status</h2>
      <form onSubmit={updateOrderStatus}>
        <label>
          Order ID:
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          New Status:
          <input
            type="text"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Update Order Status</button>
      </form>
    </div>
  );
};

export default App;
