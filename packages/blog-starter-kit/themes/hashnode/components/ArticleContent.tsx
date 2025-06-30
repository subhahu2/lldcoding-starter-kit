import React, { useState, useEffect } from 'react';
import SignInPrompt from './SignInPrompt';
import { auth, db } from './firebase'; // Make sure db is your Firestore instance
import { doc, getDoc } from 'firebase/firestore';
import ArticleLimitModal from './ArticleLimitModal';

interface ArticleContentProps {
    memoizedPostContent: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ memoizedPostContent }) => {
  const [hasSignedIn, setHasSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [articleViews, setArticleViews] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Only run on client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
        } else {
          setHasAccess(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const views = Number(localStorage.getItem('articleViews') || 0) + 1;
      setArticleViews(views);
      localStorage.setItem('articleViews', views.toString());
    }
  }, [hasMounted]);

  useEffect(() => {
    if (articleViews > 3) setShowLimitModal(true);
  }, [articleViews]);

  if (!hasMounted) return null; // Prevent hydration mismatch

  // Show sign-in prompt if the user has viewed more than 2 articles and hasn't signed in
  if (articleViews > 1 && !hasSignedIn) {
    return <SignInPrompt onSignIn={() => setHasSignedIn(true)} />;
  }

  // If user is signed in and has access from Firestore, allow unlimited access
  if (hasSignedIn && hasAccess) {
    return (
      <div
        id="post-content-wrapper"
        className="prose prose-lg min-h-30 dark:prose-dark xl:prose-xl mx-auto mb-10 break-words"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: memoizedPostContent,
        }}
      />
    );
  }

  if (articleViews > 5 || showLimitModal) {
    return <ArticleLimitModal onClose={() => setShowLimitModal(false)} />;
  }

  return (
    <>
      <div
        id="post-content-wrapper"
        className="prose prose-lg min-h-30 dark:prose-dark xl:prose-xl mx-auto mb-10 break-words"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: memoizedPostContent,
        }}
      />
    </>
  );
};

export default ArticleContent;