import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

const { FiUsers, FiMessageCircle, FiTrendingUp, FiDollarSign, FiBarChart } = FiIcons;

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalResponses: 0,
    paidUsers: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Mock admin data
    setAdminStats({
      totalUsers: 1247,
      totalResponses: 15623,
      paidUsers: 89,
      monthlyRevenue: 3420
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  const stats = [
    {
      name: "Total Users",
      value: adminStats.totalUsers.toLocaleString(),
      icon: FiUsers,
      color: "text-blue-600",
      change: "+12%"
    },
    {
      name: "Responses Generated",
      value: adminStats.totalResponses.toLocaleString(),
      icon: FiMessageCircle,
      color: "text-green-600",
      change: "+8%"
    },
    {
      name: "Paid Subscribers",
      value: adminStats.paidUsers,
      icon: FiTrendingUp,
      color: "text-purple-600",
      change: "+15%"
    },
    {
      name: "Monthly Revenue",
      value: `$${adminStats.monthlyRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: "text-orange-600",
      change: "+23%"
    }
  ];

  const recentUsers = [
    { id: 1, name: "John Smith", email: "john@example.com", plan: "Basic", joined: "2024-01-15" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", plan: "Pro", joined: "2024-01-14" },
    { id: 3, name: "Mike Chen", email: "mike@example.com", plan: "Free", joined: "2024-01-13" },
    { id: 4, name: "Lisa Rodriguez", email: "lisa@example.com", plan: "Basic", joined: "2024-01-12" },
    { id: 5, name: "David Wilson", email: "david@example.com", plan: "Free", joined: "2024-01-11" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              ReviewGenie.ai platform overview and analytics
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                    <SafeIcon icon={stat.icon} className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Users */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
                <SafeIcon icon={FiUsers} className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        user.plan === 'Pro' ? 'bg-purple-100 text-purple-800' :
                        user.plan === 'Basic' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.plan}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{user.joined}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage Analytics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Usage Analytics</h2>
                <SafeIcon icon={FiBarChart} className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Free Plan Users</span>
                    <span className="text-sm text-gray-900">1,158 (93%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '93%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Basic Plan Users</span>
                    <span className="text-sm text-gray-900">64 (5%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Pro Plan Users</span>
                    <span className="text-sm text-gray-900">25 (2%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '2%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">This Month</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">New Signups</p>
                    <p className="text-lg font-bold text-gray-900">342</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Conversions</p>
                    <p className="text-lg font-bold text-gray-900">18</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;