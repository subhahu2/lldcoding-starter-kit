import React from 'react';

type TryOurCourseModalProps = {
  onClose: () => void;
};

const TryOurCourseModal: React.FC<TryOurCourseModalProps> = ({ onClose }) => {
  const handleUpgrade = async () => {
    // API call to upgrade membership
    try {
      // Replace this with your API call logic
      console.log('Upgrading membership to lifetime...');
      window.location.href = 'https://payments.cashfree.com/forms/try-lldcoding';
      onClose(); // Close modal on success
    } catch (error) {
      console.error('Error upgrading membership:', error);
    }
  };

  return (
    <div className="inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Try Our Course for 4 Hours @9rs</h2>
        <p className="mb-6">Try our course for 4 Hours and if you like it, you can go for one year or lifetime access! </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpgrade}
            className="px-4 py-2 bg-brand-orange text-white rounded hover:bg-brand-orange-dark"
          >
            Try @9rs
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryOurCourseModal;