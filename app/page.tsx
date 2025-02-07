import FilterAndSort from "./components/FilterAndSort";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-10">
        <FilterAndSort />

        {/* Products Section (placeholder for now) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Placeholder product cards */}
          <div className="p-4 bg-gray-100 rounded shadow">Product 1</div>
          <div className="p-4 bg-gray-100 rounded shadow">Product 2</div>
          <div className="p-4 bg-gray-100 rounded shadow">Product 3</div>
          <div className="p-4 bg-gray-100 rounded shadow">Product 4</div>
        </div>
      </div>
    </>
  );
}
