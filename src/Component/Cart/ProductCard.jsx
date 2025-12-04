import React from "react";

const ProductCard = ({ image, title, price }) => {
  return (
    <div className="w-[250px]">
      {/* Image / Placeholder */}
      <div className="w-full h-[320px] bg-gray-300 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 text-sm">No Image</span>
        )}
      </div>

      {/* Title & price */}
      <h3 className="text-sm mt-3 font-semibold uppercase">{title}</h3>
      <p className="text-sm text-gray-700">Rs. {price}</p>
    </div>
  );
};

export default ProductCard;
