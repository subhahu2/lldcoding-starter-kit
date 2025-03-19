import React from 'react';
import { auth, googleProvider, signInWithPopup } from './firebase'; // Import Firebase auth and provider

const SignInPrompt = ({ onSignIn }) => {
  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google using a popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log('Signed in user:', user);
      onSignIn(); // Call the onSignIn callback to update the state
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center border border-orange-100">
        {/* Icon or Emoji */}
        <div className="text-5xl mb-4" style={{ color: 'rgb(255 161 22)' }}>
          🔒
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'rgb(255 161 22)' }}>
          You’ve Reached Your Free Limit
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          To continue reading, please sign in. It’s quick and easy!
        </p>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 rounded-lg font-semibold text-white transition-colors mb-4 hover:bg-opacity-90"
          style={{ backgroundColor: 'rgb(255 161 22)' }}
        >
          Sign In with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-gray-500 text-sm">
          Don’t have an account?{' '}
          <span
            className="cursor-pointer font-semibold hover:underline"
            style={{ color: 'rgb(255 161 22)' }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInPrompt;