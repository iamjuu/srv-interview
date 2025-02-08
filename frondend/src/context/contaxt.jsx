import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    status: null,
    token: null,
    // Add other user-related fields as needed
  });

  const updateUserData = (newData) => {
    setUserData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const clearUserData = () => {
    setUserData({
      status: null,
      token: null
    });
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};