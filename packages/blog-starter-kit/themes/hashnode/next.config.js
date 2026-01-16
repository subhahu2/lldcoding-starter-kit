const { request, gql } = require('graphql-request');

const ANALYTICS_BASE_URL = 'https://hn-ping2.hashnode.com';
const HASHNODE_ADVANCED_ANALYTICS_URL = 'https://user-analytics.hashnode.com';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;
const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;

const getBasePath = () => {
  if (BASE_URL && BASE_URL.indexOf('/') !== -1) {
    return BASE_URL.substring(BASE_URL.indexOf('/'));
  }
  return undefined;
};

// Cache redirection rules to prevent multiple fetches
let redirectionRulesCache = null;

const getRedirectionRules = async () => {
  // Return cache if exists
  if (redirectionRulesCache !== null) {
    return redirectionRulesCache;
  }

  // If environment variables are missing, return empty array
  if (!GQL_ENDPOINT || !host) {
    console.warn('Missing required environment variables for redirection rules');
    redirectionRulesCache = [];
    return redirectionRulesCache;
  }

  try {
    const query = gql`
      query GetRedirectionRules {
        publication(host: "${host}") {
          id
          redirectionRules {
            source
            destination
            type
          }
        }
      }
    `;

    const data = await request(GQL_ENDPOINT, query);

    if (!data.publication) {
      console.warn('No publication found with the provided host');
      redirectionRulesCache = [];
      return redirectionRulesCache;
    }

    const redirectionRules = data.publication.redirectionRules;

    // Convert to next.js redirects format
    const redirects = redirectionRules
      .filter((rule) => {
        // Hashnode gives an option to set a wildcard redirect,
        // but it doesn't work properly with Next.js
        // the solution is to filter out all the rules with wildcard and use static redirects for now
        return rule.source.indexOf('*') === -1;
      })
      .map((rule) => {
        return {
          source: rule.source,
          destination: rule.destination,
          permanent: rule.type === 'PERMANENT',
        };
      });

    redirectionRulesCache = redirects;
    return redirects;
  } catch (error) {
    console.error('Error fetching redirection rules:', error.message);
    redirectionRulesCache = [];
    return redirectionRulesCache;
  }
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ['@starter-kit/utils'],
  swcMinify: true,
  compress: true,
  
  // Remove the duplicate experimental property and consolidate them
  experimental: {
    scrollRestoration: true,
    // Remove optimizeCss as it can cause issues with certain setups
    // optimizeCss: false,
  },
  
  basePath: getBasePath(),
  
  // Add optimization settings
  optimizeFonts: true,
  optimizeCss: false, // Set to false to avoid conflicts with SWC
  
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
      },
    ],
  },
  
  // Add compiler options for better optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.log in production
  },
  
  // Add webpack configuration for better minification
  webpack: (config, { dev, isServer }) => {
    // Only optimize in production
    if (!dev && !isServer) {
      // Ensure minification is enabled
      config.optimization.minimize = true;
      
      // Remove console.log in production
      config.optimization.minimizer = config.optimization.minimizer || [];
      
      // Add aggressive merging
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
  
  async rewrites() {
    return [
      {
        source: '/ping/data-event',
        destination: `${ANALYTICS_BASE_URL}/api/data-event`,
      },
      {
        source: '/api/analytics',
        destination: `${HASHNODE_ADVANCED_ANALYTICS_URL}/api/analytics`,
      },
    ];
  },
  
  async redirects() {
    // Return empty array if we're in a context where we can't fetch (like static export)
    if (process.env.NEXT_PHASE === 'phase-production-build' && !GQL_ENDPOINT) {
      return [];
    }
    
    try {
      return await getRedirectionRules();
    } catch (error) {
      console.error('Failed to get redirection rules:', error);
      return [];
    }
  },
};

// Add a simple build optimization configuration
if (process.env.NODE_ENV === 'production') {
  // Ensure production optimizations
  nextConfig.poweredByHeader = false;
  nextConfig.generateEtags = true;
  nextConfig.productionBrowserSourceMaps = false; // Disable source maps in production for smaller bundles
}

module.exports = nextConfig;