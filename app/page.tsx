import FilterAndSort from "./components/FilterAndSort";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filter & Sort (Left Sidebar) */}
          <div className="md:col-span-1 bg-white p-4 rounded shadow">
            <FilterAndSort />
          </div>

          {/* Products Section (Right Side) */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="p-4 bg-gray-100 rounded shadow">Product 1</div>
            <div className="p-4 bg-gray-100 rounded shadow">Product 2</div>
            <div className="p-4 bg-gray-100 rounded shadow">Product 3</div>
            <div className="p-4 bg-gray-100 rounded shadow">Product 4</div>
          </div>
        </div>
      </div>
    </>
  );
}
