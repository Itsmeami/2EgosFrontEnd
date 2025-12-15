import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import placeholder from "../../../public/img/tshirt1.png";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/product/get");
        const json = await res.json();

        if (json.success) {
          setProducts(json.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div className="w-full px-10 py-8">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <button className="bg-red-500 text-white px-4 py-1 text-xs font-semibold">
          LATEST DROP
        </button>
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
        {products.map((p) => {
          const imageUrl =
            p.media && p.media.length > 0
              ? `http://localhost:5000/${p.media[0].url}`
              : placeholder;

          const price = p.discounted_price || p.base_price;

          return (
            <ProductCard
              key={p.id}
              image={imageUrl}
              title={p.title}
              price={price}
            />
          );
        })}
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
