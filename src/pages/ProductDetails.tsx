import { useParams } from "react-router-dom";
import { products } from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <div>Product not found!</div>;

  return (
    <div className="rounded-3xl bg-red-500 p-4 border shadow-md">
      <img src={product.image} alt={product.title} className="w-full h-60 rounded-2xl object-cover" />
      <h2 className="text-xl font-bold">{product.title}</h2>
      <p>{product.description}</p>
      <p className="text-lg font-semibold">{product.price}</p>
      <p className="text-lg text-red-500 font-semibold">{product.price}</p>
      
    </div>
  );
};

export default ProductDetails;