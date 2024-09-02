import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Edit = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [titleProduct, setTitle] = useState("");
  const [priceProduct, setPrice] = useState(0);
  const [decProduct, setDec] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`) 
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setTitle(data.title);
        setPrice(data.price);
        setDec(data.description);
      })
      .catch((err) => console.error("Error in fetching API"));
  }, [productId]);

  const editProduct = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleProduct,
        price: priceProduct,
        description: decProduct,
      }),
    })
    Swal.fire({
        title:"You Edit this product",
        icon:"success"
    })
    .then(() => navigate("/products"))

       Swal.fire({
         title: "Successful modifcation process",
         icon: "success",
       });
  };

  return (
    <div>
      <h1>Edit this Product</h1>
      <div className="container">
        <form onSubmit={editProduct}>
          <div className="mb-3">
            <label htmlFor="productTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="productTitle"
              aria-describedby="product title"
              placeholder="Product Title"
              value={titleProduct}
              onChange={(e) => setTitle(e.target.value)}
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
              aria-describedby="product Price"
              placeholder="Product Price"
              value={priceProduct}
              onChange={(e) => setPrice(e.target.value)}
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
              aria-describedby="product Price"
              placeholder="Product Description"
              value={decProduct}
              onChange={(e) => setDec(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Edit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
