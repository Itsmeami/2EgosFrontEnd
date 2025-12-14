// src/cart/CartItem.jsx

export default function CartItem({ item, refreshCart }) {
  const updateQty = async (qty) => {
    await fetch(`http://localhost:5000/api/cart/update/${item.cart_item_id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: qty }),
    });
    refreshCart();
  };

  const removeItem = async () => {
    await fetch(`http://localhost:5000/api/cart/remove/${item.cart_item_id}`, {
      method: "DELETE",
      credentials: "include",
    });
    refreshCart();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded shadow mb-3">
      <div>
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.brand}</p>
        <p className="font-bold text-blue-600">₹{item.discounted_price}</p>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQty(parseInt(e.target.value))}
          className="w-20 border rounded px-2 py-1"
        />

        <button
          onClick={removeItem}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
