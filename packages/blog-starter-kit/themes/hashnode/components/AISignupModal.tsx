import React, { useState } from 'react';

type AISignupModalProps = {
  onClose: () => void;
};

const AISignupModal: React.FC<AISignupModalProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      // Track the signup attempt (optional)
      await fetch('/api/track-signup', { method: 'POST' });
      
      // Redirect to signup page
      window.location.href = 'https://tiny.outlier.ai/y8xrz4ck';
    } catch (error) {
      console.error('Error during signup:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Remote Job Opportunity from Scaler.AI</h2>
        
        <div className="mb-6 space-y-3">
          <p className="text-gray-700">
            Get <span className="font-semibold text-brand-blue">flexible, remote, paid work</span> with cutting-edge AI models.
          </p>
          
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Set your own hours</li>
            <li>Earn competitive pay</li>
            <li>Gain real-world AI experience</li>
            <li>Limited spots available!</li>
          </ul>
          
          <p className="pt-2 text-sm text-gray-600">
            <span className="font-semibold">Special Offer:</span> First 100 signups get priority access.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSignup}
            className="px-4 py-2 bg-brand-orange text-white rounded-md hover:bg-orange-600 transition flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Sign Up Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Usage Example:
const EmailAdWithModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Your email ad content */}
      <button 
        onClick={() => setShowModal(true)}
        className="mt-4 px-5 py-3 bg-brand-orange text-white rounded-lg hover:bg-orange-600"
      >
        Learn More About This Opportunity
      </button>
      
      {showModal && <AISignupModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AISignupModal;