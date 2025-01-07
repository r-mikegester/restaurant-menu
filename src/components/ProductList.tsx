// import React from "react";
import { products } from "../data/products";

const ProductList = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product) => (
      <div key={product.id} className="p-4 border rounded-3xl shadow">
        <img src={product.image} alt={product.title} className="w-full rounded-2xl h-40 object-cover" />
        <h2 className="text-lg font-bold">{product.title}</h2>
        <p>{product.description}</p>
        <p className="font-semibold">{product.price}</p>
      </div>
    ))}
  </div>
);

export default ProductList;