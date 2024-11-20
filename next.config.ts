import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	exporimental: {
		serverActions: {
			bodySizeLimit: '100mb',
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.pixabay.com',
			},
			{
				protocol: 'https',
				hostname: 'cloud.appwrite.io',
			},
		],
	},
};

export default nextConfig;
