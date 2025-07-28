import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiCopy, FiCheck, FiGlobe, FiMessageCircle, FiZap } = FiIcons;

const ReviewGenerator = ({ isDemo = false }) => {
  const { user, updateUser } = useAuth();
  const [reviewText, setReviewText] = useState('');
  const [tone, setTone] = useState('friendly');
  const [language, setLanguage] = useState('english');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const tones = [
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'formal', label: 'Formal', description: 'Professional and courteous' },
    { value: 'apologetic', label: 'Apologetic', description: 'Sincere and understanding' }
  ];

  const languages = [
    { value: 'english', label: 'English', flag: '🇺🇸' },
    { value: 'arabic', label: 'Arabic', flag: '🇸🇦' }
  ];

  const sampleResponses = {
    friendly: {
      english: "Thank you so much for taking the time to share your experience! We're thrilled to hear that you enjoyed your visit. Your feedback means the world to us and motivates our team to continue providing excellent service. We look forward to welcoming you back soon!",
      arabic: "شكراً جزيلاً لكم على أخذ الوقت لمشاركة تجربتكم! نحن سعداء جداً لسماع أنكم استمتعتم بزيارتكم. ملاحظاتكم تعني لنا الكثير وتحفز فريقنا على الاستمرار في تقديم خدمة ممتازة. نتطلع لاستقبالكم مرة أخرى قريباً!"
    },
    formal: {
      english: "We appreciate you taking the time to provide feedback about your experience with our establishment. Your positive review is greatly valued and serves as recognition of our team's dedication to excellence. We remain committed to maintaining the high standards you experienced and look forward to serving you again.",
      arabic: "نقدر لكم أخذ الوقت لتقديم ملاحظات حول تجربتكم مع مؤسستنا. مراجعتكم الإيجابية محل تقدير كبير وتمثل اعترافاً بتفاني فريقنا في السعي للتميز. نحن ملتزمون بالحفاظ على المعايير العالية التي جربتموها ونتطلع لخدمتكم مرة أخرى."
    },
    apologetic: {
      english: "Thank you for bringing this to our attention, and we sincerely apologize for not meeting your expectations. Your feedback is invaluable in helping us improve our services. We would appreciate the opportunity to make this right and invite you to contact us directly so we can address your concerns properly.",
      arabic: "شكراً لكم على لفت انتباهنا لهذا الأمر، ونعتذر بصدق لعدم تلبية توقعاتكم. ملاحظاتكم لا تقدر بثمن في مساعدتنا على تحسين خدماتنا. نود أن نحصل على فرصة لتصحيح هذا الأمر وندعوكم للاتصال بنا مباشرة حتى نتمكن من معالجة مخاوفكم بشكل صحيح."
    }
  };

  const generateResponse = async () => {
    if (!reviewText.trim()) return;
    
    if (!isDemo && user && user.responsesUsed >= user.responsesLimit && user.plan === 'free') {
      alert('You have reached your monthly limit. Please upgrade to generate more responses.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = sampleResponses[tone][language];
    setGeneratedResponse(response);
    
    if (!isDemo && user) {
      updateUser({ responsesUsed: user.responsesUsed + 1 });
    }
    
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {isDemo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <SafeIcon icon={FiZap} className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">Demo Mode - Try it risk-free!</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Review Text
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Paste the Google review here..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {tones.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label} - {t.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={generateResponse}
            disabled={!reviewText.trim() || isGenerating}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating Response...
              </>
            ) : (
              <>
                <SafeIcon icon={FiMessageCircle} className="w-5 h-5 mr-2" />
                Generate Response
              </>
            )}
          </button>

          {!isDemo && user && user.plan === 'free' && (
            <div className="text-sm text-gray-600 text-center">
              {user.responsesUsed}/{user.responsesLimit} responses used this month
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generated Response
            </label>
            <div className="relative">
              <textarea
                value={generatedResponse}
                readOnly
                placeholder="Your AI-generated response will appear here..."
                className="w-full h-32 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none"
              />
              {generatedResponse && (
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Copy to clipboard"
                >
                  <SafeIcon 
                    icon={copied ? FiCheck : FiCopy} 
                    className={`w-5 h-5 ${copied ? 'text-green-500' : ''}`} 
                  />
                </button>
              )}
            </div>
          </div>

          {generatedResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4"
            >
              <div className="flex items-center mb-2">
                <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Response Generated!</span>
              </div>
              <p className="text-green-700 text-sm">
                Copy this response and paste it directly into your Google Business profile.
              </p>
            </motion.div>
          )}

          {/* Sample Reviews for Demo */}
          {isDemo && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Try with sample reviews:</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setReviewText("Amazing service! The staff was incredibly helpful and the food was delicious. Will definitely be coming back!")}
                  className="w-full text-left p-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                >
                  ⭐⭐⭐⭐⭐ "Amazing service! The staff was incredibly helpful..."
                </button>
                <button
                  onClick={() => setReviewText("The wait time was too long and the food was cold when it arrived. Very disappointed with the experience.")}
                  className="w-full text-left p-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                >
                  ⭐⭐ "The wait time was too long and the food was cold..."
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewGenerator;