import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://amar-shop-server.vercel.app/products', {
          params: {
            search: searchTerm,
            brand: brandFilter,
            category: categoryFilter,
            price: priceFilter,
            sort: sortOption,
            page: currentPage,
            limit: 10, // You can adjust the limit as needed
          },
        });
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [searchTerm, brandFilter, categoryFilter, priceFilter, sortOption, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4 sm:p-10 md:p-20">
      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Search products..."
          className="input input-bordered w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-4">
          {/* Sorting Options */}
          <select
            className="select select-bordered w-full sm:w-auto"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Date Added: Newest First</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <select
          className="select select-bordered w-full"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          <option value="">Filter by Brand</option>
          {/* Add all brand options here */}
          <option value="asus">Asus</option>
          <option value="lenovo">Lenovo</option>
          {/* ... more options */}
        </select>

        <select
          className="select select-bordered w-full"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Filter by Category</option>
          <option value="laptops">Laptops</option>
          <option value="mobiles">Mobile Phones</option>
          {/* ... more options */}
        </select>

        <select
          className="select select-bordered w-full"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">Filter by Price Range</option>
          <option value="low">Below 15,000</option>
          <option value="medium">15,000 - 30,000</option>
          <option value="high">30,000 - 50,000</option>
          <option value="above">Above 50,000</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product._id}
            className="card w-full shadow-xl bg-custom-bg"
          >
            <figure>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg">
                {product.name}
                {new Date(product.creationDate) > new Date(Date.now() - 7*24*60*60*1000) && (
                  <div className="badge badge-secondary ml-2">NEW</div>
                )}
              </h2>
              <p className="text-sm">{product.description}</p>
              <p className="text-sm"><strong>Price:</strong> {product.price} BDT</p>
              <p className="text-sm"><strong>Category:</strong> {product.category}</p>
              <p className="text-sm"><strong>Ratings:</strong> {product.ratings}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">{product.category}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          className="btn btn-primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
