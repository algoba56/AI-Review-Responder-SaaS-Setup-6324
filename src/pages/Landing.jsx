import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import Header from '../components/Header';
import PricingSection from '../components/PricingSection';
import ReviewGenerator from '../components/ReviewGenerator';

const { FiStar, FiMessageCircle, FiZap, FiShield, FiGlobe, FiTrendingUp, FiUsers, FiClock } = FiIcons;

const Landing = () => {
  const [showGenerator, setShowGenerator] = useState(false);

  const features = [
    {
      icon: FiZap,
      title: "AI-Powered Responses",
      description: "Generate professional responses in seconds with advanced AI technology"
    },
    {
      icon: FiGlobe,
      title: "Multi-Language Support",
      description: "Support for English and Arabic with more languages coming soon"
    },
    {
      icon: FiMessageCircle,
      title: "Multiple Tones",
      description: "Choose from Friendly, Formal, or Apologetic tones for any situation"
    },
    {
      icon: FiShield,
      title: "Brand Protection",
      description: "Maintain your professional image with consistent, quality responses"
    },
    {
      icon: FiClock,
      title: "Save Time",
      description: "Respond to reviews 10x faster than writing manual responses"
    },
    {
      icon: FiTrendingUp,
      title: "SEO Optimized",
      description: "Responses are crafted to improve your local SEO rankings"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      business: "Downtown Café",
      text: "ReviewGenie.ai saved me hours every week. The responses are professional and my customers love them!",
      rating: 5
    },
    {
      name: "Mike Chen",
      business: "Tech Repair Shop",
      text: "As a small business owner, this tool is a game-changer. Even negative reviews get handled professionally.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      business: "Beauty Salon",
      text: "The Arabic support is perfect for my diverse customer base. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Automatically Respond to
            <span className="text-blue-600"> Google Reviews</span>
            <br />with AI — in Seconds
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Turn every review into a marketing opportunity. Save time, protect your brand, 
            and sound professional — all without writing a word.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={() => setShowGenerator(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Try Free Demo
            </button>
            <Link 
              to="/register"
              className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all"
            >
              Start Free Trial
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm text-gray-500"
          >
            ✅ No credit card required • ✅ 5 free responses • ✅ Setup in 30 seconds
          </motion.div>
        </div>
      </section>

      {/* Demo Generator Modal */}
      {showGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Try ReviewGenie.ai Demo</h3>
                <button
                  onClick={() => setShowGenerator(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <SafeIcon icon={FiIcons.FiX} className="w-6 h-6" />
                </button>
              </div>
              <ReviewGenerator isDemo={true} />
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ReviewGenie.ai?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your online reputation professionally
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Generate professional responses in 3 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Paste Review",
                description: "Copy any Google review and paste it into our tool"
              },
              {
                step: "2", 
                title: "Choose Tone",
                description: "Select Friendly, Formal, or Apologetic tone"
              },
              {
                step: "3",
                title: "Copy & Respond",
                description: "Get your AI-generated response and paste it to Google"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.business}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Review Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses using ReviewGenie.ai to protect and grow their reputation
          </p>
          <Link 
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-block"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <SafeIcon icon={FiMessageCircle} className="w-8 h-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold">ReviewGenie.ai</span>
              </div>
              <p className="text-gray-400">
                AI-powered Google review responses for local businesses
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Demo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ReviewGenie.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;