import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import ReviewGenerator from '../components/ReviewGenerator';

const { FiMessageCircle, FiTrendingUp, FiClock, FiStar, FiBarChart3, FiSettings, FiCreditCard } = FiIcons;

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('generator');
  const [responseHistory, setResponseHistory] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Mock response history
    const mockHistory = [
      {
        id: 1,
        review: "Great service and food!",
        response: "Thank you so much for your wonderful review!",
        tone: "friendly",
        language: "english",
        date: "2024-01-15"
      },
      {
        id: 2,
        review: "Food was cold and service slow.",
        response: "We sincerely apologize for not meeting your expectations...",
        tone: "apologetic",
        language: "english",
        date: "2024-01-14"
      }
    ];
    setResponseHistory(mockHistory);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    {
      name: "Responses Generated",
      value: user.responsesUsed,
      icon: FiMessageCircle,
      color: "text-blue-600"
    },
    {
      name: "Responses Remaining",
      value: user.plan === 'free' ? (user.responsesLimit - user.responsesUsed) : '∞',
      icon: FiTrendingUp,
      color: "text-green-600"
    },
    {
      name: "Current Plan",
      value: user.plan.charAt(0).toUpperCase() + user.plan.slice(1),
      icon: FiStar,
      color: "text-purple-600"
    },
    {
      name: "Time Saved",
      value: `${user.responsesUsed * 5} min`,
      icon: FiClock,
      color: "text-orange-600"
    }
  ];

  const tabs = [
    { id: 'generator', name: 'Response Generator', icon: FiMessageCircle },
    { id: 'history', name: 'Response History', icon: FiBarChart3 },
    { id: 'settings', name: 'Account Settings', icon: FiSettings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600">
              Generate professional responses to your Google reviews with AI
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
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                    <SafeIcon icon={stat.icon} className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Usage Warning */}
          {user.plan === 'free' && user.responsesUsed >= user.responsesLimit * 0.8 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <SafeIcon icon={FiCreditCard} className="w-5 h-5 text-orange-600 mr-2" />
                <div>
                  <h3 className="text-orange-800 font-medium">
                    You're running low on responses
                  </h3>
                  <p className="text-orange-700 text-sm">
                    You've used {user.responsesUsed} of {user.responsesLimit} free responses. 
                    Upgrade to continue generating unlimited responses.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {activeTab === 'generator' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Generate Response
                </h2>
                <ReviewGenerator />
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Response History
                </h2>
                {responseHistory.length > 0 ? (
                  <div className="space-y-4">
                    {responseHistory.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-gray-600">
                            {item.date} • {item.tone} • {item.language}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Original Review:</h4>
                            <p className="text-gray-600 text-sm">{item.review}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Generated Response:</h4>
                            <p className="text-gray-600 text-sm">{item.response}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <SafeIcon icon={FiMessageCircle} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No responses generated yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Account Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={user.name}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                          </p>
                          <p className="text-sm text-gray-600">
                            {user.plan === 'free' 
                              ? `${user.responsesUsed}/${user.responsesLimit} responses used`
                              : 'Unlimited responses'
                            }
                          </p>
                        </div>
                        {user.plan === 'free' && (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Upgrade
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;