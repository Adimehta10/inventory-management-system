import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock_products: 0,
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadProducts();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
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

  const lowStockProducts = products.filter(
    (product) => product.quantity < 5
  );

  return (
    <div>
      <div
  style={{
    marginBottom: "30px",
    textAlign: "center",
    width: "100%",
  }}
>
  <h1
    style={{
      marginBottom: "10px",
    }}
  >
    Welcome Back 👋
  </h1>

  <p
    style={{
      opacity: 0.8,
      fontSize: "18px",
      maxWidth: "700px",
      margin: "0 auto",
    }}
  >
    Monitor inventory, customers and orders
    in one place.
  </p>
</div>

      <div className="cards">
        <div
          className="card"
          style={{
            background:
              "linear-gradient(135deg,#60a5fa,#2563eb)",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: "40px",
              marginBottom: "15px",
            }}
          >
            📦
          </div>

          <h3>Total Products</h3>

          <p
            style={{
              color: "white",
              WebkitTextFillColor: "white",
            }}
          >
            {stats.total_products}
          </p>

          <small>Available products</small>
        </div>

        <div
          className="card"
          style={{
            background:
              "linear-gradient(135deg,#34d399,#10b981)",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: "40px",
              marginBottom: "15px",
            }}
          >
            👥
          </div>

          <h3>Total Customers</h3>

          <p
            style={{
              color: "white",
              WebkitTextFillColor: "white",
            }}
          >
            {stats.total_customers}
          </p>

          <small>Registered customers</small>
        </div>

        <div
          className="card"
          style={{
            background:
              "linear-gradient(135deg,#a78bfa,#7c3aed)",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: "40px",
              marginBottom: "15px",
            }}
          >
            🛒
          </div>

          <h3>Total Orders</h3>

          <p
            style={{
              color: "white",
              WebkitTextFillColor: "white",
            }}
          >
            {stats.total_orders}
          </p>

          <small>Orders placed</small>
        </div>

        <div
          className="card"
          style={{
            background:
              "linear-gradient(135deg,#fb7185,#e11d48)",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: "40px",
              marginBottom: "15px",
            }}
          >
            ⚠️
          </div>

          <h3>Low Stock Products</h3>

          <p
            style={{
              color: "white",
              WebkitTextFillColor: "white",
            }}
          >
            {stats.low_stock_products}
          </p>

          <small>Needs attention</small>
        </div>
      </div>

      <div
        className="card"
        style={{
          marginTop: "35px",
          padding: "25px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          ⚠️ Low Stock Products
        </h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>SKU</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>
                    <span
                      style={{
                        background:
                          "rgba(239,68,68,.15)",
                        color: "#ef4444",
                        padding:
                          "6px 12px",
                        borderRadius:
                          "999px",
                        fontWeight:
                          "600",
                      }}
                    >
                      {product.quantity}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "30px",
                  }}
                >
                  🎉 No low stock products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;