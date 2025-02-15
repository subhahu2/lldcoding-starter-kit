import { type GetServerSideProps } from 'next';

const AdsTxt = () => null;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { res } = ctx;
    const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;
    if (!host) {
        throw new Error('Could not determine host');
    }

    const sitemapUrl = `https://${host}/sitemap.xml`;
    const robotsTxt = `
google.com, pub-5345114477325138, DIRECT, f08c47fec0942fa0
  `.trim();

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.setHeader('content-type', 'text/plain');
    res.write(robotsTxt);
    res.end();

    return { props: {} };
};

export default AdsTxt;
