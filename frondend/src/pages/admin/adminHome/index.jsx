import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Package, Search, Filter, Trash, X } from 'lucide-react';
import Axios from '../../../Instance/Instance';
import { Link } from 'react-router-dom';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    price: '',
    img: null,
    imglink: '',
    imgPreview: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Cleanup function for image previews
  useEffect(() => {
    return () => {
      if (editFormData.imgPreview) {
        URL.revokeObjectURL(editFormData.imgPreview);
      }
    };
  }, [editFormData.imgPreview]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('userToken'); // Make sure you fetch the correct token
      const response = await Axios.get('/get-product', {  
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
      console.log('Fetched products:', response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    if (!product) {
      console.error('No product provided for editing');
      return;
    }
  
    console.log('Editing product:', product);
    setSelectedProduct(product);
    setEditFormData({
      name: product.name || '',
      price: product.price?.toString() || '',
      img: null,
      imglink: product.imglink || '',
      imgPreview: null
    });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setError('Please select an image file');
          return;
        }
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          setError('File size should be less than 5MB');
          return;
        }

        // Cleanup old preview if exists
        if (editFormData.imgPreview) {
          URL.revokeObjectURL(editFormData.imgPreview);
        }

        // Create new preview URL
        const previewUrl = URL.createObjectURL(file);
        setEditFormData(prev => ({
          ...prev,
          img: file,
          imgPreview: previewUrl,
          imglink: '' // Clear old imglink when new file is selected
        }));
      }
    } else {
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
  
    if (!selectedProduct?._id) {
      setError('No product selected for update');
      setIsLoading(false);
      return;
    }
  
    try {
      const formData = new FormData();
  
      // Validate and clean the data
      const cleanedName = editFormData.name.trim();
      const cleanedPrice = parseFloat(editFormData.price);
  
      if (!cleanedName) {
        throw new Error('Product name is required');
      }
  
      if (isNaN(cleanedPrice) || cleanedPrice <= 0) {
        throw new Error('Valid price is required');
      }
  
      // Append form data
      formData.append('name', cleanedName);
      formData.append('price', cleanedPrice.toString());
  
      if (editFormData.img) {
        formData.append('image', editFormData.img);
      }
  
      // Log the FormData contents
      console.log('Form Data Contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
      }
  
      const response = await Axios.put(
        `/update-product/${selectedProduct._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
            // Remove the Access-Control-Allow-Origin header - this should be handled by the backend
          },
          withCredentials: true // If you're using cookies
        }
      );
  
      console.log('Response:', response.data);
  
      if (response.data?.success) {
        await fetchProducts();
        closeEditModal();
      } else {
        throw new Error(response.data?.message || 'Failed to update product');
      }
  
    } catch (error) {
      console.error('Error updating product:', error);
      setError(error.message || 'Failed to update product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete?._id) {
      setError('No product selected for deletion');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await Axios.delete(`/delete-product/${productToDelete._id}`);
      await fetchProducts();
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeEditModal = () => {
    if (editFormData.imgPreview) {
      URL.revokeObjectURL(editFormData.imgPreview);
    }
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    setEditFormData({
      name: '',
      price: '',
      img: null,
      imglink: '',
      imgPreview: null
    });
    setError(null);
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Product</h2>
          <button 
            onClick={closeEditModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={editFormData.price}
              onChange={handleEditInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              name="img"
              onChange={handleEditInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
            
            {(editFormData.imgPreview || editFormData.imglink) && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {editFormData.imgPreview ? 'New image preview:' : 'Current image:'}
                </p>
                <img
                  src={editFormData.imgPreview || `http://localhost:7000/public/${editFormData.imglink}`}
                  alt="Product preview"
                  className="mt-1 w-32 h-32 object-cover rounded"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={closeEditModal}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderDeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Confirm Delete</h2>
          <p className="mt-2 text-gray-600">
            Are you sure you want to delete {productToDelete?.name}? This action cannot be undone.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              setIsDeleteModalOpen(false);
              setProductToDelete(null);
              setError(null);
            }}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to='/login'>
        <button className='border p-2 rounded-full hover:bg-blue-500 hover:text-white'> Sign out</button></Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Package className="w-6 h-6" />
          Product Management
        </h1>
        <Link to='/admin/addform'>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Error Display */}
      {error && !isEditModalOpen && !isDeleteModalOpen && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && !isEditModalOpen && !isDeleteModalOpen && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  {isLoading ? 'Loading products...' : 'No products found'}
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <img
                      src={`http://localhost:7000/public/${product.imglink}`}
                      alt={product.name}
                      className="w-56 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-4">
                      <button 
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        onClick={() => handleEdit(product)}
                        disabled={isLoading}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        onClick={() => openDeleteModal(product)}
                        disabled={isLoading}
                      >
                        <Trash className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {isEditModalOpen && renderEditModal()}
      {isDeleteModalOpen && renderDeleteModal()}
    </div>
  );
};

export default ProductManagement;