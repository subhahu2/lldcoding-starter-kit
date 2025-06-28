import React, { useState, useEffect } from 'react';
import SignInPrompt from './SignInPrompt';
import { auth } from './firebase';
import ArticleLimitModal from './ArticleLimitModal';

interface ArticleContentProps {
    memoizedPostContent: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ memoizedPostContent }) => {
  const [hasSignedIn, setHasSignedIn] = useState(false);
  const [articleViews, setArticleViews] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Only run on client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setHasSignedIn(true);
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
    if (articleViews > 5) setShowLimitModal(true);
  }, [articleViews]);

  if (!hasMounted) return null; // Prevent hydration mismatch

  // Show sign-in prompt if the user has viewed more than 2 articles and hasn't signed in
  if (articleViews > 1 && !hasSignedIn) {
    return <SignInPrompt onSignIn={() => setHasSignedIn(true)} />;
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