import React, { useState } from 'react';
import { Bell, CreditCard, Store, Truck, Globe, Shield } from 'lucide-react';
import  Axios  from '../../Instance/Instance';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isChecked, setIsChecked] = useState(false);

  // Step 2: Handle the toggle change
  const handleToggleChange = (e) => {
    setIsChecked(e.target.checked);
    console.log('Toggle is now:', e.target.checked);
    
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.error('Token is not found. Please log in.');
      return;
    }
    console.log(token,'tokenn');
    
  
    Axios.post('/subscribetoggle', {}, {
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
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your notification configurations</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg ${
            activeTab === 'general'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <Store className="h-4 w-4" />
          Notification
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <p className="text-gray-500 mb-6">New Product Notification</p>

            <div className="space-y-6">
            <div className="flex items-center justify-between">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}  // Bind state to checkbox
          onChange={handleToggleChange}  // Handle the change event
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500">
        </div>
      </label>
    </div>
             
            </div>
          </div>
        )}
    
      </div>
    </div>
  );
};

export default SettingsPage;
