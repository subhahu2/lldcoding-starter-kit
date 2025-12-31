import Link from 'next/link';
import { forwardRef, useRef, useState, useEffect } from 'react';
import { twJoin } from 'tailwind-merge';

/* eslint-disable no-nested-ternary */
import { getCommonBtnStyles } from './common-header-icon-btn';
import HeaderBlogSearch from './header-blog-search';
import HeaderLeftSidebar from './header-left-sidebar';
import HeaderTooltip from './header-tooltip';
import { ChevronLeftSVG } from './icons/svgs/';
import PublicationSocialLinks from './publication-social-links';
import useStickyNavScroll from './use-sticky-nav-scroll';

import { PublicationFragment } from '../generated/graphql';
import { Button } from './custom-button';
import PublicationLogo from './publication-logo';
import WhatsAppButton from './whatsapp';
import YouTubeButton from './youtube';
import TryOurCourseModal from './TryOurCourseModal';
import SubscriptionDaysCounter from './SubscriptionDaysCounter';
import UserAuthThumbnail from './UserAuthThumbnail';

type Props = {
	publication: Pick<PublicationFragment, 'id' | 'title' | 'links' | 'url' | 'features' | 'isTeam' | 'author' | 'preferences'>;
};

const PostPageNavbar = forwardRef<HTMLElement, Props>((props, ref) => {
	const { publication } = props;
	const [showTryModal, setShowTryModal] = useState(true);
	const tryModalDismissed = useRef(false);

	// Auth and subscription state
	const [hasSignedIn, setHasSignedIn] = useState(false);
	const [subscriptionType, setSubscriptionType] = useState<string | null>(null);
	const [orderId, setOrderId] = useState<string | null>(null);

	useEffect(() => {
		// Try to get user info from localStorage (same as header.tsx)
		const userAccess = localStorage.getItem('userAccess');
		if (userAccess) {
			try {
				const parsed = JSON.parse(userAccess);
				setHasSignedIn(!!parsed.hasAccess);
				setSubscriptionType(parsed.subscriptionType || null);
				setOrderId(parsed.orderId || null);
			} catch {
				setHasSignedIn(false);
				setSubscriptionType(null);
				setOrderId(null);
			}
		} else {
			setHasSignedIn(false);
			setSubscriptionType(null);
			setOrderId(null);
		}
	}, []);

	const handleTryModalClose = () => {
		setShowTryModal(false);
		tryModalDismissed.current = true; // Persist modal dismissal state
	};

	useStickyNavScroll({ elRef: ref });

	const commonIconBtnStyles = getCommonBtnStyles();

	return (
		<>
		{/* <div className="bg-brand-orange text-white text-center py-2 overflow-hidden">
    			<div className="marquee">
      				<span>BIG DROP | 🎉 Limited Time Offer: Get <b>200 Rs OFF off</b> on our lifetime lld course for today! Use code: <b> NOV200 </b> at checkout 🎉</span>
   	 			</div>
		</div> */}
		<div className="bg-brand-orange text-white text-center py-2 overflow-hidden">
    			<div className="marquee">
      				<span>🚨 IMPORTANT ALERT: All LLDcoding Course Prices (including Lifetime & Extensions) will INCREASE by ₹300 starting 1st January 2026! Enroll NOW to lock in current pricing</span>
   	 			</div>
		</div>
		<SubscriptionDaysCounter />
		<div className="container mx-auto px-2 md:px-4 md:py-1 2xl:px-10">
			<div className="relative z-40 flex flex-row items-center justify-between pb-2 pt-8 md:py-4">
				<div
					className={twJoin(
						'mb-2 flex flex-row items-center md:mb-0','dark:text-white',
					)}
				>
					<HeaderTooltip
						tooltipClassName="blog-home-tooltip"
						tooltipText="Home"
					>
						<Link
							href="/"
							aria-label="Back to blog home"
							className={twJoin('blog-back-to-home-button', commonIconBtnStyles, 'mr-2 p-3')}
						>
							<ChevronLeftSVG className="h-4 w-4 fill-current pr-1" />
						</Link>
					</HeaderTooltip>

					{/* Navigation for mobile view */}
					<div className="mr-2">
						<HeaderLeftSidebar publication={publication} />
					</div>

					<div className="hidden md:block">
						<PublicationLogo publication={publication} size="sm" withProfileImage isPostPage />
					</div>
				</div>

				<div
					className={twJoin(
						'flex flex-row items-center','dark:text-white',
					)}
				>
					<HeaderBlogSearch publication={publication} />
					<WhatsAppButton />
					<YouTubeButton />
								{/* Show Buy Course if not signed in, else show Go to Dashboard if subscribed */}
								{!hasSignedIn ? (
									<Button as="a" href="https://interview.lldcoding.com/" className="bg-brand-orange" type="primary" label="Buy Course" />
								) : (subscriptionType && orderId ? (
									<Button as="a" href="https://interview.lldcoding.com/dashboard" className="bg-brand-orange" type="primary" label="Course" />
								) : (
									<Button as="a" href="https://interview.lldcoding.com/" className="bg-brand-orange" type="primary" label="Buy Course" />
								))}
					<div className="hidden md:block ml-2"> {/* Added margin for separation */}
        				<UserAuthThumbnail />
      				</div>
				</div>
			</div>

			{/* Logo for mobile view */}
			<div className="mx-auto my-5 flex w-2/3 flex-row items-center justify-center md:hidden">
				<PublicationLogo publication={publication} size="xl" isPostPage />
			</div>

			<div className="blog-sub-header mb-4 md:hidden" data-testid="blog-sub-header">
				{/* Social Links for mobile view */}
				<div className="mt-6">
					<PublicationSocialLinks links={publication.links} />
				</div>
			</div>
		</div>
		{showTryModal && <TryOurCourseModal onClose={handleTryModalClose} />}
		</>
	);
});

PostPageNavbar.displayName = 'PostPageNavbar';

export default PostPageNavbar;
