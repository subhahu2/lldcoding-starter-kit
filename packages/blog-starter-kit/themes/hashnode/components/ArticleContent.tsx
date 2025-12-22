
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SignInPrompt from './SignInPrompt';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import ArticleLimitModal from './ArticleLimitModal';

interface ArticleContentProps {
    memoizedPostContent: string;
}


const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[200px]" aria-label="Loading">
    <svg className="animate-spin h-8 w-8 text-orange-500" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  </div>
);

const ArticleContent: React.FC<ArticleContentProps> = React.memo(({ memoizedPostContent }) => {
  const [hasSignedIn, setHasSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [articleViews, setArticleViews] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Only run on client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    setLoading(true);
    unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setHasSignedIn(true);
        setUserEmail(user.email);
        setUserId(user.uid);
        // Fetch subscription status from Firestore
        const docRef = doc(db, 'blog-subscription', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Check access and expiry
          const hasValidAccess =
            !!data.access &&
            data.expiry &&
            data.expiry.toDate &&
            data.expiry.toDate() > new Date();
          setHasAccess(hasValidAccess);
          const expiry = data.expiry.toDate().toISOString();
          // Store in localStorage
          localStorage.setItem(
            'userAccess',
            JSON.stringify({
              hasAccess: hasValidAccess,
              expiry: expiry,
              subscriptionType: data.subscriptionType || null,
              orderId: data.orderId || null,
            })
          );
        } else {
          setHasAccess(false);
        }
      } else {
        setHasSignedIn(false);
        setUserEmail(null);
        setUserId(null);
        setHasAccess(false);
      }
      setLoading(false);
    });
    return () => { unsub && unsub(); };
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const prevViews = Number(localStorage.getItem('articleViews') || 0);
      const views = prevViews + 1;
      if (views !== articleViews) {
        setArticleViews(views);
        localStorage.setItem('articleViews', views.toString());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMounted]);

  useEffect(() => {
    if (articleViews > 1 && !showLimitModal) setShowLimitModal(true);
  }, [articleViews]);

  const handleSignIn = useCallback(() => setHasSignedIn(true), []);
  const handleCloseLimitModal = useCallback(() => setShowLimitModal(false), []);

  // Memoize content for performance
  const postContent = useMemo(() => (
    <div
      id="post-content-wrapper"
      className="prose prose-lg min-h-30 dark:prose-dark xl:prose-xl mx-auto mb-10 break-words animate-fadeInUp"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: memoizedPostContent,
      }}
      aria-label="Article Content"
      tabIndex={0}
    />
  ), [memoizedPostContent]);

  if (!hasMounted) return null; // Prevent hydration mismatch
  if (loading) return <LoadingSpinner />;

  // Show sign-in prompt if the user has viewed more than 2 articles and hasn't signed in
  if (articleViews > 1 && !hasSignedIn) {
    return <SignInPrompt onSignIn={handleSignIn} />;
  }

  // If user is signed in and has access from Firestore, allow unlimited access
  if (hasSignedIn && hasAccess) {
    return postContent;
  }

  if (articleViews > 1) {
    if(showLimitModal) {
      return <ArticleLimitModal onClose={handleCloseLimitModal} />;
    }
    return (
    <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-center max-w-md">
        <div className="text-4xl mb-4">🔒</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Content Locked
        </h3>
        <p className="text-gray-600 mb-4">
          You&apos;ve reached your free article limit. Please subscribe to unlock more content.
        </p>
        <button
          onClick={() => setShowLimitModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Unlock Content
        </button>
      </div>
    </div>
  );
  }

  return postContent;
});

ArticleContent.displayName = 'ArticleContent';

export default ArticleContent;