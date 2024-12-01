import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import axios from "axios";
import "./OrderList.css";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // Fetch orders on initial render
    useEffect(() => {
        fetchOrders();
    }, []);

    // Fetch orders function
    const fetchOrders = () => {
        axios
            .get("/orders")
            .then((response) => setOrders(response.data))
            .catch((error) => console.error("Error fetching orders:", error));
    };

    // Update order status function
    const updateOrderStatus = (e) => {
        e.preventDefault();
        axios
            .put(`/orders/${orderId}`, { OrderStatus: orderStatus })
            .then((response) => {
                alert(response.data.message);
                setOrderId("");
                setOrderStatus("");
                fetchOrders(); // Refresh the order list after update
            })
            .catch((error) => console.error("Error updating order status:", error));
    };

    // Delete order function
    const deleteOrder = (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            axios
                .delete(`/orders/${id}`)
                .then((response) => {
                    alert(response.data.message);
                    fetchOrders(); // Refresh the order list after delete
                })
                .catch((error) => console.error("Error deleting order:", error));
        }
    };

    // Logout handler
    const handleLogout = () => {
        // Clear the authentication token or any other user-related data
        localStorage.removeItem('token'); // Assuming the token is stored in localStorage
        // You can also clear state here, if you're using context or global state
        
        // Navigate to Home page after logout
        navigate("/"); // Redirect to the Home page
    };

    return (
        <div>
            {/* Navigation */}
            <div className="navigation">
                <Link to="/new-order" style={{ marginLeft: "20px" }}>
                    Add New Order
                </Link>
                <button onClick={handleLogout} className="logout-link">
                    Logout
                </button>
            </div>

            <h3>Coffee Shop Ordering System</h3>
            <h4>Available Orders</h4>

            {/* Orders Table */}
            <table>
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>Items</th>
                        <th>CustomerName</th>
                        <th>Price</th>
                        <th>OrderStatus</th>
                        <th>PaymentStatus</th>
                        <th>OrderedDate</th>
                        <th>UpdatedAt</th>
                        <th>Actions</th> {/* New column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.Items.join(", ")}</td>
                            <td>{order.CustomerName}</td>
                            <td>${order.Price.toFixed(2)}</td>
                            <td>{order.OrderStatus}</td>
                            <td>{order.PaymentStatus}</td>
                            <td>{new Date(order.OrderedDate).toLocaleString()}</td>
                            <td>{new Date(order.UpdatedAt).toLocaleString()}</td>
                            <td>
                                <button
                                    onClick={() => deleteOrder(order._id)}
                                    style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                        borderRadius: "4px",
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Order Form */}
            <h4>Update Order Status</h4>
            <form onSubmit={updateOrderStatus}>
                <div>
                    <label>Order ID:</label>
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Status:</label>
                    <input
                        type="text"
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Order Status</button>
            </form>

            {/* Footer */}
            <footer>© 2024 CoffeeShop</footer>
        </div>
    );
};

export default OrderList;
