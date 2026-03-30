import { useEffect, useState } from 'react';
import OfferRunner from "./OfferRunner";


const SubscriptionDaysCounter = () => {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [isValidSubscription, setIsValidSubscription] = useState<boolean>(false);

  useEffect(() => {
    // Only run on client side where localStorage is available
    if (typeof window !== 'undefined') {
      const accessStr = localStorage.getItem('userAccess');
      if (accessStr) {
        try {
          const accessObj = JSON.parse(accessStr);
          if (accessObj.hasAccess && accessObj.expiry) {
            const expiryDate = new Date(accessObj.expiry);
            const today = new Date();
            
            if (expiryDate > today) {
              setIsValidSubscription(true);
              // Calculate days left
              const diffTime = expiryDate.getTime() - today.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              setDaysLeft(diffDays);
            } else {
              setIsValidSubscription(false);
            }
          }
        } catch (e) {
          console.error('Error parsing userAccess:', e);
          setIsValidSubscription(false);
        }
      }
    }
  }, []);

  if (!isValidSubscription || daysLeft === null) {
    return (
      <>
      <OfferRunner />
      <div className="bg-brand-orange text-white text-center py-2 overflow-hidden">
    			<div className="marquee">
      				<span>📌 12-Hour Refund Policy: Email us at admin@lldcoding.com within 12 hours of purchase to get a full refund.</span>
   	 			</div>
			</div>
      </>
    )
    // return null; // Don't render anything if no valid subscription
  }

  return (
    <div className="bg-brand-orange text-white text-center py-2 overflow-hidden">
      <div className="marquee">
        <span>
          Your subscription ends in <b>{daysLeft} day{daysLeft !== 1 ? 's' : ''}</b>. Renew now to continue access!
           Click here to <a href="https://payments.cashfree.com/forms?code=lldcoding-blogs-subscription" className="underline">renew</a>.
        </span>
      </div>
    </div>
  );
};

export default SubscriptionDaysCounter;