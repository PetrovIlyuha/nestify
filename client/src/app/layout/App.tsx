import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "../../features/categories/CategoryPage";
import StoreFront from "../../features/storefront/components/StoreFront";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StoreFront />} />
        <Route path="/basket" element={<div>Basket Page</div>} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
