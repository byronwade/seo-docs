import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		ppr: true,
		inlineCss: true,
	},
	images: {
		remotePatterns: [
			{
				hostname: "placehold.co",
			},
		],
		dangerouslyAllowSVG: true,
	},
};
export default withPayload(nextConfig);
