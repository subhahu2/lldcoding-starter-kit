import { twJoin } from 'tailwind-merge';
import { lightOrDark } from '../utils/commonUtils';
import { useAppContext } from './contexts/appContext';
import { Button } from './custom-button';
import HeaderBlogSearch from './header-blog-search';
import HeaderLeftSidebar from './header-left-sidebar';
import PublicationLogo from './publication-logo';
import PublicationNavLinks from './publication-nav-links';
import PublicationSocialLinks from './publication-social-links';
import WhatsAppButton from './whatsapp';
import YouTubeButton from './youtube';
import { useRef, useState, useEffect } from 'react';
import TryOurCourseModal from './TryOurCourseModal';
import AISignupModal from './AISignupModal';
import SubscriptionDaysCounter from './SubscriptionDaysCounter';
import UserAuthThumbnail from './UserAuthThumbnail';

type Props = {
	currentMenuId?: string | null;
	isHome: boolean;
};

export const Header = (props: Props) => {
	const { currentMenuId, isHome } = props;

	const { publication } = useAppContext();
	const [showTryModal, setShowTryModal] = useState(true);
	const tryModalDismissed = useRef(false);

	// Auth and subscription state
	const [hasSignedIn, setHasSignedIn] = useState(false);
	const [subscriptionType, setSubscriptionType] = useState<string | null>(null);
	const [orderId, setOrderId] = useState<string | null>(null);

	useEffect(() => {
		// Try to get user info from localStorage (same as ArticleContent)
		const userAccess = localStorage.getItem('userAccess');
		if (userAccess) {
			try {
				const parsed = JSON.parse(userAccess);
				console.log('User access from localStorage:', parsed);
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

	return (
		<>
		<header
			className="blog-header relative z-50 w-full border-b border-black/10 bg-white bg-opacity-70 dark:border-white/10 dark:bg-slate-900 dark:bg-opacity-70"
		>
			{/* <div className="bg-brand-orange text-white text-center py-2 overflow-hidden">
    			<div className="marquee">
      				<span>BIG DROP | 🎉 Limited Time Offer: Get <b>300 Rs OFF</b> on lifetime lld course for today! Use code: <b> NOV300 </b> at checkout 🎉</span>
   	 			</div>
			</div> */}
			<SubscriptionDaysCounter />

			<div className="container mx-auto px-2 md:px-4 2xl:px-10">
				<div className="relative z-40 flex flex-row items-center justify-between pb-2 pt-8 md:mb-4">
					<div className="flex flex-row items-center py-1">
						{/* Navigation for mobile view */}
						<div
							className={twJoin(
								'md:hidden','dark:text-white',
							)}
						>
							<HeaderLeftSidebar publication={publication} />
						</div>
						<div className="hidden md:block">
							<PublicationLogo publication={publication} size="lg" withProfileImage />
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
						<div className="hidden md:block ml-2">
        					<UserAuthThumbnail />
      					</div>
					</div>
				</div>

				{/* Logo for mobile view */}
				<div className="mx-auto my-5 flex w-2/3 flex-row items-center justify-center md:hidden">
					<PublicationLogo publication={publication} size="xl" />
				</div>

				<div className="blog-sub-header" data-testid="blog-sub-header">
					{/* Desktop */}
					<div className="justify-betweem mx-0 mb-2 hidden w-full flex-row items-center md:flex">
						<PublicationSocialLinks
							links={publication.links}
						/>
					</div>
					{/* Mobile view */}
					<div className="mb-2 flex w-full flex-col items-center md:hidden">
						<PublicationSocialLinks
							links={publication.links}
						/>
					</div>
				</div>

				<div
					className="relative mt-8 hidden flex-row items-center justify-center overflow-hidden text-base md:flex"
					data-tom="hidden md:flex relative flex-row items-center justify-center overflow-hidden text-base mt-8"
				>
					<PublicationNavLinks
						isHome={isHome}
						currentActiveMenuItemId={currentMenuId}
						enabledPages={publication.preferences?.enabledPages}
						navbarItems={publication.preferences?.navbarItems || []}
					/>
				</div>
			</div>
		</header>
		{showTryModal && <TryOurCourseModal onClose={handleTryModalClose} />}
		</>
	);
};
