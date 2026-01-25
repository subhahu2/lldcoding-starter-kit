import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';

type ArticleLimitModalProps = {
  onClose: () => void;
};

const ArticleLimitModal: React.FC<ArticleLimitModalProps> = React.memo(({ onClose }) => {
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  }, [onClose]);

  // Trap focus inside modal for accessibility
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Remove scroll lock for debugging
  // React.useEffect(() => {
  //   const original = document.body.style.overflow;
  //   document.body.style.overflow = 'hidden';
  //   return () => { document.body.style.overflow = original; };
  // }, []);

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 overflow-y-auto"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={handleBackdropClick}
      style={{ zIndex: 9999 }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto border border-orange-100 overflow-hidden relative animate-fadeInUp"
        style={{ zIndex: 10000, pointerEvents: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button (top-right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Close modal"
          tabIndex={0}
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 text-center border-b border-gray-100">
          <div className="text-5xl mb-3" style={{ color: 'rgb(255 161 22)' }}>🚫</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'rgb(255 161 22)' }}>Article Limit Reached</h2>
          <p className="text-gray-600">
            You&apos;ve reached your free article limit.<br />
            To continue reading, please buy our course or subscribe.
          </p>
        </div>

        {/* Scrollable content area */}
        <div className="overflow-y-auto max-h-[60vh] p-4 md:p-6">
          {/* 🏆 COURSE OPTION */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-4 shadow-sm mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-900 text-lg md:text-xl">Full LLD Course</h3>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                BEST VALUE
              </span>
            </div>
            <ul className="space-y-2 mb-4 pl-1">
              <li className="flex items-start gap-2 text-sm md:text-base">
                <span>✅</span> <span><strong>All Video Explanations</strong> (YouTube included)</span>
              </li>
              <li className="flex items-start gap-2 text-sm md:text-base">
                <span>✅</span> <span><strong>Interactive IDE</strong> for hands-on coding</span>
              </li>
              <li className="flex items-start gap-2 text-sm md:text-base">
                <span>✅</span> <span><strong>Diagrams & Cheatsheets</strong> (PDF downloads)</span>
              </li>
              <li className="flex items-start gap-2 text-sm md:text-base">
                <span>✅</span> <span><strong>Future updates FREE</strong> (Lifetime access)</span>
              </li>
              <li className="flex items-start gap-2 text-sm md:text-base">
                <span>✅</span> <span><strong>Unlimited Blog Access</strong></span>
              </li>
            </ul>
            <a
              href="https://interview.lldcoding.com/"
              className="w-full py-3 md:py-4 rounded-lg font-bold text-white text-center block hover:shadow-lg transition-all transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-orange-400"
              style={{ backgroundColor: '#FF5E0E' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now - ₹2400 <span className="text-amber-100">(Only ₹199/month)</span>
            </a>
            <p className="text-xs md:text-sm text-center mt-2 text-gray-600">
              One-time payment • No hidden charges
            </p>
          </div>

          {/* ⚠️ SUBSCRIPTION OPTION */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-700 text-lg md:text-xl">Blogs-Only Subscription</h3>
              <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                LIMITED
              </span>
            </div>
            <ul className="space-y-2 mb-4 pl-1 text-sm md:text-base text-gray-600">
              <li className="flex items-start gap-2">
                <span>❌</span> <span>No video access</span>
              </li>
              <li className="flex items-start gap-2">
                <span>❌</span> <span>No IDE or diagrams</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✅</span> <span>Only blogs with Partial Content</span>
              </li>
              <li className="flex items-start gap-2">
                <span>❌</span> <span>No Course Content</span>
              </li>
            </ul>
            <a
              href="https://payments.cashfree.com/forms?code=lldcoding-blogs-subscription"
              className="w-full py-2 md:py-3 rounded-lg font-semibold text-white text-center block hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              style={{ backgroundColor: '#6366f1' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe for ₹115/month For 3 Months
            </a>
            <p className="text-xs md:text-sm text-center mt-2 text-gray-500">
              No Auto Renew
            </p>
          </div>
        </div>
      </div>
    </div>,
    typeof window !== 'undefined' && document.body ? document.body : document.createElement('div')
  );
});

ArticleLimitModal.displayName = 'ArticleLimitModal';

export default ArticleLimitModal;