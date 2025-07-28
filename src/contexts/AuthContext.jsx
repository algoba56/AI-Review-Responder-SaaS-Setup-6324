import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('reviewgenie_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication
    const mockUser = {
      id: 1,
      email,
      name: email.split('@')[0],
      plan: 'free',
      responsesUsed: 0,
      responsesLimit: 5,
      isAdmin: email === 'admin@reviewgenie.ai'
    };
    
    setUser(mockUser);
    localStorage.setItem('reviewgenie_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const register = async (name, email, password) => {
    // Mock registration
    const mockUser = {
      id: Date.now(),
      email,
      name,
      plan: 'free',
      responsesUsed: 0,
      responsesLimit: 5,
      isAdmin: false
    };
    
    setUser(mockUser);
    localStorage.setItem('reviewgenie_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('reviewgenie_user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('reviewgenie_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};