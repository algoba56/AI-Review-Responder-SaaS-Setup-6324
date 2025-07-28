import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiStar } = FiIcons;

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out ReviewGenie.ai",
      features: [
        "5 responses per month",
        "English language support",
        "Basic tone options",
        "Copy to clipboard"
      ],
      buttonText: "Start Free",
      buttonClass: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      popular: false
    },
    {
      name: "Basic",
      price: "$19",
      period: "per month",
      description: "Great for small businesses",
      features: [
        "100 responses per month",
        "English & Arabic support",
        "All tone options",
        "Response history",
        "Priority support"
      ],
      buttonText: "Start Basic Plan",
      buttonClass: "bg-blue-600 text-white hover:bg-blue-700",
      popular: true
    },
    {
      name: "Pro",
      price: "$49",
      period: "per month",
      description: "Perfect for agencies and growing businesses",
      features: [
        "Unlimited responses",
        "All languages",
        "Team access (5 users)",
        "Advanced analytics",
        "Custom templates",
        "API access",
        "White-label option"
      ],
      buttonText: "Start Pro Plan",
      buttonClass: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      popular: false
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your business needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-8 relative ${
                plan.popular ? 'border-2 border-blue-500 transform scale-105' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <SafeIcon icon={FiStar} className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/register"
                className={`w-full py-3 px-4 rounded-lg font-semibold text-center transition-all block ${plan.buttonClass}`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500">
            Need a custom plan? <a href="#" className="text-blue-600 hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;