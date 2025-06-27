import React from 'react';

type ArticleLimitModalProps = {
  onClose: () => void;
};

const ArticleLimitModal: React.FC<ArticleLimitModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center border border-orange-100">
      <div className="text-5xl mb-4" style={{ color: 'rgb(255 161 22)' }}>
        🚫
      </div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: 'rgb(255 161 22)' }}>
        Article Limit Reached
      </h2>
      <p className="text-gray-600 mb-6">
        You’ve reached your free article limit.<br />
        To continue reading, please buy our course or subscribe for just <b>₹49/month (Blogs only)</b>.
      </p>
      <div className="flex flex-col gap-3">
        <a
          href="https://interview.lldcoding.com/"
          className="w-full py-3 rounded-lg font-semibold text-white transition-colors"
          style={{ backgroundColor: 'rgb(255 161 22)' }}
        >
          Buy Course
        </a>
        <a
          href="https://payments.cashfree.com/forms?code=lldcoding-blogs-subscription"
          className="w-full py-3 rounded-lg font-semibold text-white transition-colors"
          style={{ backgroundColor: '#6366f1' }}
        >
          Subscribe for ₹49/month
        </a>
        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg font-semibold text-gray-700 border mt-2"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ArticleLimitModal;