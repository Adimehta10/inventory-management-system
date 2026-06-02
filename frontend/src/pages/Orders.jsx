import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadOrders();
    loadCustomers();
    loadProducts();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      await api.post("/orders", {
        customer_id: Number(formData.customer_id),
        product_id: Number(formData.product_id),
        quantity: Number(formData.quantity),
      });

      setMessage("Order created successfully");

      setFormData({
        customer_id: "",
        product_id: "",
        quantity: "",
      });

      loadOrders();
      loadProducts();
    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Failed to create order");
      }
    }
  };

  const viewOrderDetails = async (id) => {
    try {
      const res = await api.get(`/orders/${id}`);

      setSelectedOrder(res.data);
      setShowDetails(true);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load order details");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) {
      return;
    }

    try {
      await api.delete(`/orders/${id}`);

      setMessage("Order deleted successfully");

      loadOrders();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete order");
    }
  };

  return (
    <div>
      <h1>Orders</h1>

      {message && (
        <div
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            padding: "10px",
            background: "#e2e8f0",
            borderRadius: "8px",
          }}
        >
          {message}
        </div>
      )}

      {showDetails && selectedOrder && (
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Order Details</h3>

          <p>
            <strong>Order ID:</strong> {selectedOrder.id}
          </p>

          <p>
            <strong>Customer ID:</strong>{" "}
            {selectedOrder.customer_id}
          </p>

          <p>
            <strong>Product ID:</strong>{" "}
            {selectedOrder.product_id}
          </p>

          <p>
            <strong>Quantity:</strong>{" "}
            {selectedOrder.quantity}
          </p>

          <p>
            <strong>Total Amount:</strong> ₹
            {selectedOrder.total_amount}
          </p>

          <button
            onClick={() => setShowDetails(false)}
          >
            Close
          </button>
        </div>
      )}

      <form
        onSubmit={createOrder}
        style={{
          display: "grid",
          gap: "12px",
          maxWidth: "500px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <select
          value={formData.customer_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              customer_id: e.target.value,
            })
          }
          required
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.full_name}
            </option>
          ))}
        </select>

        <select
          value={formData.product_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              product_id: e.target.value,
            })
          }
          required
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name} (Stock: {product.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({
              ...formData,
              quantity: e.target.value,
            })
          }
          required
        />

        <button type="submit">
          Create Order
        </button>
      </form>

      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_id}</td>
              <td>{order.product_id}</td>
              <td>{order.quantity}</td>
              <td>₹{order.total_amount}</td>

              <td>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      viewOrderDetails(order.id)
                    }
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      deleteOrder(order.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;