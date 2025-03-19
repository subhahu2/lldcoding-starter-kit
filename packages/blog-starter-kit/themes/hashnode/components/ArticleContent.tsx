import React, { useState } from 'react';
import SignInPrompt from './SignInPrompt';
import { auth } from './firebase';

interface ArticleContentProps {
    memoizedPostContent: string;  // or another specific type
}
  
  const ArticleContent: React.FC<ArticleContentProps> = ({ memoizedPostContent }) => {
  const [hasSignedIn, setHasSignedIn] = useState(false);
  const [articleViews, setArticleViews] = useState(0);

  // Check if the user is already signed in
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setHasSignedIn(true);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Load article views from local storage on component mount
  React.useEffect(() => {
    const views = localStorage.getItem('articleViews') || 0;
    setArticleViews(Number(views));
  }, []);

  // Update article views in local storage
  React.useEffect(() => {
    localStorage.setItem('articleViews', articleViews.toString());
  }, [articleViews]);

  // Increment article views when the component mounts
  React.useEffect(() => {
    setArticleViews((prevViews) => prevViews + 1);
  }, []);

  // Show sign-in prompt if the user has viewed more than 2 articles and hasn't signed in
  if (articleViews > 4 && !hasSignedIn) {
    return <SignInPrompt onSignIn={() => setHasSignedIn(true)} />;
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
      <p>Ujjwal Jain</p>
    </>
  );
};

export default ArticleContent;