import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]);

  // this function display product in page
  const display = () => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    display();
  }, []);

  
  // function Delete product

  const deleteProduct = (product) => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/products/${product.id}`, {
          method: "DELETE",
        })
          .then(() => {
            display(); // Refresh products after deletion
            Swal.fire({
              title: "Product deleted successfully",
              icon: "success",
            });
          })
          .catch((error) => console.error("Error deleting product:", error));
      }
    });
  };

  const DeleteAllProduct = () => {
    Swal.fire({
      title: "Are You Sure to Delete All Products ",
      icon: "warning",
      showCancelButton: "true",
    }).then((e) => {
      if (e.isConfirmed) {
        if (products.length > 0) {
          fetch("http://localhost:3000/products", { method: "DELETE" })
          .then(
            () => setProducts([])
          );
          Swal.fire({
            title: "You Delete All Products ",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "I am sorry there are no products to Delete",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <h1>Products page</h1>
      <Link
        to="/products/add"
        className=" btn btn-success 
mt-3"
      >
        Add New Product
      </Link>

      <button
        className="btn btn-danger mt-3 ms-3"
        onClick={() => DeleteAllProduct()}
      >
        Delete All Product{" "}
      </button>
      <table
        className="table table-striped mt5  products
table"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map((i) => (
            <tr>
              <td>{i.id}</td>
              <td>{i.title}</td>
              <td>{i.description.slice(0, 20)}...</td>
              <td>{i.price}</td>
              <td>
                <button
                  className="btn btn-danger btn"
                  onClick={() => deleteProduct(i)}
                >
                  Delete
                </button>
                <Link
                  className="btn btn-info btn"
                  to={`/products/view/${i.id}`}
                >
                  View
                </Link>
                <Link
                  className="btn btn-primary btn"
                  to={`/products/edit/${i.id}`}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
