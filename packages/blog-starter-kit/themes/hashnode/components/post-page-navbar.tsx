import Link from 'next/link';
import { forwardRef, useRef, useState } from 'react';
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

type Props = {
	publication: Pick<PublicationFragment, 'id' | 'title' | 'links' | 'url' | 'features' | 'isTeam' | 'author' | 'preferences'>;
};

const PostPageNavbar = forwardRef<HTMLElement, Props>((props, ref) => {
	const { publication } = props;
	const [showTryModal, setShowTryModal] = useState(false);
	const tryModalDismissed = useRef(false);

	const handleTryModalClose = () => {
		setShowTryModal(false);
		tryModalDismissed.current = true; // Persist modal dismissal state
	};

	useStickyNavScroll({ elRef: ref });

	const commonIconBtnStyles = getCommonBtnStyles();

	return (
		<>
		<div className="bg-brand-orange text-white text-center py-2 overflow-hidden">
    			<div className="marquee">
      				<span>🎉 Limited Time Offer: Get <b>300rs off</b> on our lld course till 14th June 2025! Use code: <b> JUNE300 </b> at checkout 🎉</span>
   	 			</div>
			</div>
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
					<Button as="a" href="https://interview.lldcoding.com/" className="bg-brand-orange" type="primary" label="Buy Course" />
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
