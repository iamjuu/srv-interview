import React, { useState, useEffect } from 'react';
import Axios from '../../Instance/Instance';

const ProductCard = () => {
  const [subscriptions, setSubscriptions] = useState([]);  // Use an array to store subscribed productIds
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user token from localStorage
    const token = localStorage.getItem('userToken');
    console.log(token);

    if (!token) {
      console.error('Token is not found. Please log in.');
      return;
    }

    // Fetch both the products and subscriptions
    Axios.get('/get-product', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
      console.log(response.data.products);
      
      setProducts(response.data.products); // Set the products data in state
      const subscribedProductIds = response.data.subscribedProducts.map(product => product._id); // Extract subscribed product IDs
      setSubscriptions(subscribedProductIds);  // Set the list of subscribed product IDs
    })
    .catch((error) => {
      setError('Error fetching products');
      console.error('Error fetching products:', error);
    });
  }, []);

  const handleSubscribe = (productId) => {
    console.log(productId, 'product id');
    
    setSubscriptions((prev) => {
      // If already subscribed, unsubscribe, else subscribe
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId); // Remove productId from subscriptions if it's already subscribed
      } else {
        return [...prev, productId]; // Add productId to subscriptions
      }
    });

    const token = localStorage.getItem('userToken');
    if (!token) {
      console.error('Token is not found. Please log in.');
      return;
    }

    Axios.post('/subscribe', { productId }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
      console.log('Subscription successful:', response.data);
    })
    .catch((error) => {
      console.error('Error subscribing:', error);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product._id.$oid} className="rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="relative">
            <img
              src={"http://localhost:7000/public/"+product.imglink}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              ${product.price}
              <span className="text-sm text-gray-600">/month</span>
            </p>
            <button
              onClick={() => handleSubscribe(product._id)}
              className="w-full border py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              {subscriptions.includes(product._id) ? "Unsubscribe" : "Subscribe"}  {/* Check if productId is in subscriptions */}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
