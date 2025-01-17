import { useParams } from "react-router-dom";
import { products } from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <div className="text-center">Product not found!</div>;

  return (
    <div className="rounded-3xl p-4 border shadow-md max-w-lg mx-auto mt-8">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-60 rounded-2xl object-cover"
      />
      <h2 className="text-xl font-bold mt-4">{product.title}</h2>
      <p className="mt-2">{product.description}</p>
      <p className="text-lg font-semibold mt-4">{product.price}</p>
    </div>
  );
};

export default ProductDetails;
