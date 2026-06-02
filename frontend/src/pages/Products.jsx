import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load products");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      sku: "",
      price: "",
      quantity: "",
    });

    setEditingId(null);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products", {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });

      setMessage("✅ Product added successfully");

      resetForm();
      loadProducts();
    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Failed to add product");
      }
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/${editingId}`, {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });

      setMessage("✅ Product updated successfully");

      resetForm();
      loadProducts();
    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Failed to update product");
      }
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);

      setMessage("🗑 Product deleted successfully");

      loadProducts();
    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Failed to delete product");
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.sku
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
          marginBottom: "10px",
          fontSize: "12px"
        }}
      >
        <div>
          <h1>📦 Products</h1>

          <p
            style={{
              opacity: 0.8,
              marginTop: "2px",
            }}
          >
            Manage your product inventory
          </p>
        </div>

        <div
          className="page-badge"
        >
          Total Products: {products.length}
        </div>
      </div>

      {message && (
        <div className="message-box">
          {message}
        </div>
      )}

      <form
        onSubmit={
          editingId
            ? updateProduct
            : addProduct
        }
        style={{
          display: "grid",
          gap: "12px",
          marginBottom: "8px",
          maxWidth: "700px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId
            ? "💾 Save Changes"
            : "➕ Add Product"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <input
        type="text"
        placeholder="🔍 Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
  marginTop: "4px",
  marginBottom: "6px",
}}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
           <th style={{ textAlign: "center" }}>
  Actions
</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map(
            (product) => (
              <tr key={product.id}>
                <td>{product.id}</td>

                <td>{product.name}</td>

                <td>{product.sku}</td>

                <td>
                  ₹{product.price}
                </td>

                <td>
                  <span
                    style={{
                      padding:
                        "6px 12px",
                      borderRadius:
                        "999px",

                      background:
                        product.quantity <
                        5
                          ? "rgba(239,68,68,.15)"
                          : "rgba(16,185,129,.15)",

                      color:
                        product.quantity <
                        5
                          ? "#ef4444"
                          : "#10b981",

                      fontWeight:
                        "600",
                    }}
                  >
                    {
                      product.quantity
                    }
                  </span>
                </td>

                <td>
  <div
    style={{
      display: "flex",
      gap: "5px",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
                    <button
                      onClick={() =>
                        startEdit(
                          product
                        )
                      }
                    >
                      ✏ Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteProduct(
                          product.id
                        )
                      }
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;