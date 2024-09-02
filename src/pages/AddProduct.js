import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddProduct = () => {
  let navigate = useNavigate();

  const [titleProduct, setTitle] = useState("");
  const [priceProduct, setPrice] = useState(0);
  const [decProduct, setDec] = useState("");
  const [quantity, setQuantity] = useState("1");

  const sendData = (e) => {
    e.preventDefault();

    // Perform POST request for each quantity specified
    for (let i = 0; i < quantity; i++) {
      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleProduct,
          price: priceProduct,
          description: decProduct,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add product");
          }
        })
        .catch((error) => {
          console.error("Error adding product:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to add product",
            icon: "error",
          });
        });
    }

    // Show success message and navigate after all products are added
    Swal.fire({
      title: "You added a new product",
      icon: "success",
    }).then(() => navigate("/products"));    
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <div className="container">
        <form onSubmit={sendData}>
          <div className="mb-3">
            <label htmlFor="productTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="productTitle"
              placeholder="Product Title"
              value={titleProduct}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="productPrice"
              placeholder="Product Price"
              value={priceProduct}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="Description"
              placeholder="Product Description"
              value={decProduct}
              onChange={(e) => setDec(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="Quantity"
              placeholder="Product Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
