import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load customers");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addCustomer = async (e) => {
    e.preventDefault();

    try {
      await api.post("/customers", formData);

      setMessage("✅ Customer added successfully");

      setFormData({
        full_name: "",
        email: "",
        phone: "",
      });

      loadCustomers();
    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Failed to add customer");
      }
    }
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) {
      return;
    }

    try {
      await api.delete(`/customers/${id}`);

      setMessage("🗑 Customer deleted successfully");

      loadCustomers();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete customer");
    }
  };
  const filteredCustomers = customers.filter(
  (customer) =>
    customer.full_name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    customer.email
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    customer.phone
      .toLowerCase()
      .includes(search.toLowerCase())
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
          marginBottom: "25px",
          fontSize: "12px"
        }}
      >
        <div>
          <h1>👥 Customers</h1>

          <p
            style={{
              opacity: 0.8,
              marginTop: "8px",
            }}
          >
            Manage customer information
          </p>
        </div>

        <div className="page-badge">
          Total Customers: {customers.length}
        </div>
      </div>

      {message && (
        <div className="message-box">
          {message}
        </div>
      )}

      <form
        onSubmit={addCustomer}
        style={{
          display: "grid",
          gap: "12px",
          maxWidth: "700px",
        }}
      >
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">
          ➕ Add Customer
        </button>
      </form>
<input
  type="text"
  placeholder="🔍 Search customers..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  style={{
    marginTop: "4px",
    marginBottom: "8px",
  }}
/>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>

              <td>{customer.full_name}</td>

              <td>{customer.email}</td>

              <td>{customer.phone}</td>

              <td>
                <button
                  onClick={() =>
                    deleteCustomer(customer.id)
                  }
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;