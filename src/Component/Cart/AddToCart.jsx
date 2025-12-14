// src/cart/AddToCart.jsx
import { useState } from "react";

export default function AddToCart() {
  const [quantity, setQuantity] = useState(1);

  // Demo product
  const productVariantId = 101; // replace with real product_variant_id

  const handleAdd = async () => {
    const res = await fetch("http://localhost:5000/cart/add", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_variant_id: productVariantId,
        quantity,
      }),
    });

    const data = await res.json();

    if (data.success) alert("Added to cart");
    else alert(data.message);
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Demo Winter Jacket</h2>
      <p className="text-gray-600">Brand: NorthPeak</p>
      <p className="text-gray-800 font-semibold">Price: ₹999</p>

      <div className="flex items-center gap-4 mt-4">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-20 border px-2 py-1 rounded"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
