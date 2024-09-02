import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <ul className="list-unstyled">
        <li>
          <Link to="/products">Get All Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
