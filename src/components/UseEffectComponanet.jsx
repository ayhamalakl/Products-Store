import React, { useEffect, useState } from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 transform transition-all duration-300 ease-in-out hover:scale-105">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <h3 className="text-lg font-semibold mb-2 text-gray-800 hover:text-purple-600 transition-colors duration-200">
        {product.title}
      </h3>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <p className="text-sm font-medium mb-2">Category: <span className="text-blue-500">{product.category}</span></p>
      <p className="text-sm font-medium text-green-500 mb-2">Price: ${product.price}</p>
      <p className="text-sm text-yellow-500">Rating: {product.rating} ★</p>
    </div>
  );
};

const UseEffectComponent = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg font-bold text-purple-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500 text-lg font-bold">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen py-8 px-4">
      <h1 className="text-center text-3xl font-extrabold text-purple-700 mb-12 drop-shadow-lg">
        Products List
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <footer className="mt-12 text-center text-purple-700 text-sm">
        © 2024 My Store. All Rights Reserved.
      </footer>
    </div>
  );
};

export default UseEffectComponent;
