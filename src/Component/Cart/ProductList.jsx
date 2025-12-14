import React from "react";
import ProductCard from "./ProductCard";
import tshit from "../../../public/img/tshirt1.png";

const ProductList = () => {
  const products = [
    { image: tshit, title: "BangDoLed T-Shirt", price: 5200 },
    { image: tshit, title: "Dark T-Shirt", price: 5300 },
    { image: tshit, title: "Black Stomp T-Shirt", price: 4500 },
    { image: tshit, title: "Grey Night Wing T-Shirt", price: 4800 },
    { image: tshit, title: "Extra Product 1", price: 4800 },
    { image: tshit, title: "Extra Product 2", price: 4800 },
  ];

  return (
    <div className="w-full px-10 py-8">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <button className="bg-red-500 text-white px-4 py-1 text-xs font-semibold">
          LATEST DROP
        </button>

        {/* <button className="text-sm underline tracking-wide">DISCOVER</button> */}
      </div>

      {/* Product Grid */}
      <div
        className="
        grid
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-8
      "
      >
        {products.map((p, index) => (
          <ProductCard
            key={index}
            image={p.image}
            title={p.title}
            price={p.price}
          />
        ))}
      </div>

      {/* Bottom Button */}
      <div className="w-full flex justify-center mt-10">
        <button className="bg-white border px-8 py-2 rounded-full hover:bg-gray-100 transition">
          SHOP ALL
        </button>
      </div>
    </div>
  );
};

export default ProductList;
