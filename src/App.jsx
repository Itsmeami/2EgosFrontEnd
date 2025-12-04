import Navbar from "./Component/Layout/Navbar";
import Home from "./Component/Home/Home"
import Products from "./Component/Cart/ProductList";
import Footer from "./Component/Layout/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Home />
      <Products />
      <Footer />
      
      {/* Content area */}
      
    </div>
  );
}

export default App;
