import React from 'react';
import Btn from '../../components/arrowBtn';
import { Watch1,Watch2,Watch3 } from '../../Assets'; // Ensure these are properly exported from Assets

const products = [
  {
    id: 1,
    title: "Basic Subscription",
    img: Watch1, // Using About1 as the image path
    description: "Perfect for starters. Get access to essential features and content.",
    price: 19.99,
    features: ["Basic Access", "Email Support", "Weekly Updates"],
    badge: "Popular"
  },
  {
    id: 2,
    title: "Premium Subscription",
    img: Watch2, // Assuming About2 is another image in your Assets
    description: "Our most popular plan with advanced features and priority support.",
    price: 29.99,
    features: ["Unlimited Access","Monthly Updates"],
    badge: "New"
  },
  {
    id: 3,
    title: "Enterprise Subscription",
    img: Watch3, // Assuming About3 is another image in your Assets
    description: "Comprehensive solution for large teams and organizations.",
    price: 49.99,
    features: ["Custom Solutions", "24/7 Support", "Daily Updates"],
    badge: "Best Value"
  }
];

const ProductCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="rounded-lg overflow-hidden shadow-lg bg-white">
          {/* Product Image */}
          <div className="relative">
            <img 
              src={product.img} // Now using the img from the product object
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4 bg-blue-500 text-white py-1 px-3 rounded-md">
              {product.badge}
            </div>
          </div>

          {/* Product Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {product.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4">
              {product.description}
            </p>

            {/* Price and Features */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-900 mb-2">
                ${product.price}<span className="text-sm text-gray-600">/month</span>
              </p>
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe Button */}
            <Btn btnname={'subscribe'}  className={'border px-2 py-1 rounded-full hover:bg-black/70 hover:text-white'} /> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
