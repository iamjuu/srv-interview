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
    imglink: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await Axios.get('/get-product');
      console.log('Fetched products:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const openDeleteModal = (product) => {
    console.log('Opening delete modal for product:', product);
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete?._id) {
      console.error('No product ID provided for deletion');
      return;
    }

    try {
      console.log('Deleting product with ID:', productToDelete._id);
      await Axios.delete(`/delete-product/${productToDelete._id}`);
      await fetchProducts();
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
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
      imglink: product.imglink || ''
    });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setEditFormData(prev => ({
        ...prev,
        img: files[0]
      }));
    } else {
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedProduct?._id) {
      console.error('No product selected for update');
      return;
    }
  
    try {
      const formData = new FormData();
      
      formData.append('name', editFormData.name);
      formData.append('price', editFormData.price);
      
      if (editFormData.img) {
        formData.append('img', editFormData.img);
      }
      
      if (!editFormData.img && editFormData.imglink) {
        formData.append('imglink', editFormData.imglink);
      }
  
      console.log('Updating product with ID:', selectedProduct._id);
      console.log('Form data values:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      const response = await Axios.put(
        `/update-product/${selectedProduct._id}`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      if (response.data?.updatedProduct) {
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product._id === response.data.updatedProduct._id 
              ? response.data.updatedProduct 
              : product
          )
        );
        
        setIsEditModalOpen(false);
        setSelectedProduct(null);
        setEditFormData({
          name: '',
          price: '',
          img: null,
          imglink: ''
        });
      } else {
        throw new Error('Invalid server response');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
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

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">${product.price}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <img
                    src={`http://localhost:7000/public/${product.imglink}`}
                    alt={product.name}
                    className="w-56 h-32 object-cover"
                  />
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-4">
                  <button 
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    onClick={() => openDeleteModal(product)}
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
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
                {editFormData.imglink && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Current image:</p>
                    <img
                      src={`http://localhost:7000/public/${editFormData.imglink}`}
                      alt="Current product"
                      className="mt-1 w-32 h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Confirm Delete</h2>
              <p className="mt-2 text-gray-600">
                Are you sure you want to delete {productToDelete?.name}? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setProductToDelete(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;