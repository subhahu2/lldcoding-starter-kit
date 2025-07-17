import { useState, useEffect } from 'react';
import { User, signOut } from 'firebase/auth';
import Image from 'next/image';
import { auth, googleProvider, signInWithPopup } from './firebase';

export default function UserAuthThumbnail() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      setCurrentUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setIsMenuOpen(false);
      localStorage.clear(); // Clear local storage on sign out
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        <span className="hidden md:inline w-20 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 focus:outline-none"
        aria-label="User menu"
        disabled={isLoading}
      >
        {currentUser.photoURL ? (
          <Image
            src={currentUser.photoURL}
            alt="User profile"
            width={32}
            height={32}
            className="rounded-full"
            unoptimized // Recommended for external images
            priority={false}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
            {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
          </div>
        )}
        {/* <span className="hidden md:inline text-sm font-medium">
          {currentUser.displayName || currentUser.email?.split('@')[0]}
        </span> */}
      </button>

      {isMenuOpen && (
        <>
          {/* Click outside to close */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              <p className="font-medium truncate">{currentUser.displayName || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}