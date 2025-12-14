// src/cart/Cart.jsx
import { useEffect, useState } from "react";
import CartItem from "./CartItem";

export default function Cart() {
  const [items, setItems] = useState([]);

  const getCart = async () => {
    const res = await fetch("http://localhost:5000/api/cart/get", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (data.success) setItems(data.items);
  };

  const clearCart = async () => {
    await fetch("http://localhost:5000/api/cart/delete", {
      method: "DELETE",
      credentials: "include",
    });
    getCart();
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <CartItem key={item.cart_item_id} item={item} refreshCart={getCart} />
          ))}

          <button
            onClick={clearCart}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
