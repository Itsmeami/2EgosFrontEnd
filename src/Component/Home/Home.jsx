import React from "react";
import heroImage from "../../../public/img/home.png"; // replace with your image path

function Home() {
  return (
    <div className="w-full">
      <img src={heroImage} alt="Hero" className="w-full h-auto object-cover"/>
    </div>
  );
}

export default Home;
