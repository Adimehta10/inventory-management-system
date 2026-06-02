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
  const [search, setSearch] = useState("");

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
const filteredOrders = orders.filter(
  (order) =>
    order.customer_id
      .toString()
      .includes(search) ||
    order.product_id
      .toString()
      .includes(search)
);
  return (
    <div>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "10px",
    fontSize: "12px"
  }}
>
  <div>
    <h1>
    
      🛒 Orders
    </h1>

    <p
      style={{
        opacity: 0.75,
        fontSize: "16px",
      }}
    >
      Manage customer orders
    </p>
  </div>

  <div className="page-badge">
    Total Orders: {orders.length}
  </div>
</div>

      {message && (
        <div
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            padding: "10px",
            background:
  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
color: "white",
fontWeight: "600",
            borderRadius: "8px",
          }}
        >
          {message}
        </div>
      )}

      {showDetails && selectedOrder && (
        <div
          style={{
           background: "rgba(255,255,255,.25)",
backdropFilter: "blur(18px)",
border: "1px solid rgba(255,255,255,.2)",
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
          maxWidth: "700px",
marginLeft: "auto",
marginRight: "auto",
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
<input
  type="text"
  placeholder="🔍 Search by Customer ID or Product ID"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  style={{
    marginTop: "5px",
    marginBottom: "8px",
  }}
/>
      <table>
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
        {filteredOrders.map((order) => (
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
  justifyContent: "center",
}}
                >
                  <button
                    onClick={() =>
                      viewOrderDetails(order.id)
                    }
                  >
                    👁 View
                  </button>

                  <button
                    onClick={() =>
                      deleteOrder(order.id)
                    }
                  >
                    🗑 Delete
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