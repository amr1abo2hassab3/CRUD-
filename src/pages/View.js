import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {

  const {productId} = useParams();
  const [product,setProduct] = useState({})
  
  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
    .then((res) => res.json())
    .then((data) => setProduct(data))
  }, [productId]);
  
 
  return (
    <div>
      <h1 className="mt-5">{product.title}</h1>
      <h1 className="mt-5">{product.price}</h1>
      <h1 className="mt-5">{product.description}</h1>
    </div>
  );
};

export default View;
