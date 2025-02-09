import React, { useState } from 'react';
import Axios from '../../../Instance/Instance';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom';
const ProductForm = () => {
  const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null,
  });
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name.trim() || !formData.price || !formData.image) {
      setMessage('Please fill in all fields');
      return;
    }
  
    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setMessage('Please enter a valid price');
      return;
    }
  
    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('price', formData.price);
    productData.append('image', formData.image);
  
    try {
      const response = await Axios.post('/admin', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        // Display success SweetAlert message
        Swal.fire({
          title: 'Product Added',
          text: 'The product has been successfully added.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          Navigate('/adminhome'); // Navigate after user clicks "OK"
        });
      }
    } catch (error) {
      setMessage('Error adding product: ' + error.message);
    }
  
    setFormData({
      name: '',
      price: '',
      image: null,
    });
    setImagePreview(null);
  };
  

  return (
    <div className="w-full max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Product Preview"
              className="w-full h-auto rounded-md"
            />
          </div>
        )}

        {message && (
          <div
            className={`p-2 mt-2 rounded-md ${message.includes('successfully') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
          >
            {message}
          </div>
        )}

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
