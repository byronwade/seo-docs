import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { JsonLd } from 'react-schemaorg';
import {
  WebSite,
  BreadcrumbList,
  FAQPage,
  Article,
  SiteNavigationElement,
} from 'schema-dts';

const Layout = dynamic(() => import('@/components/layout').then((mod) => mod.Layout), { ssr: false });

export const metadata: Metadata = {
  title: 'SEO Docs - Learn Search Engine Optimization',
  description:
    "Comprehensive guide to SEO best practices, techniques, and strategies to improve your website's search engine rankings.",
  keywords:
    'SEO, search engine optimization, digital marketing, website ranking',
  openGraph: {
    title: 'SEO Docs - Master Search Engine Optimization',
    description:
      "Learn SEO techniques to boost your website's visibility and traffic.",
    url: 'https://your-domain.com',
    siteName: 'SEO Docs',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SEO Docs Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Docs - Expert SEO Guidance',
    description:
      "Elevate your website's performance with our comprehensive SEO resources.",
    images: ['https://your-domain.com/twitter-image.jpg'],
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://your-domain.com',
  },
};

function HomePage() {
  return (
    <>
      <JsonLd<WebSite>
        item={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'SEO Docs',
          url: 'https://your-domain.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate:
                'https://your-domain.com/search?q={search_term_string}',
            },
          },
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://your-domain.com',
            },
          ],
        }}
      />
      <JsonLd<FAQPage>
        item={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is SEO?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'SEO stands for Search Engine Optimization. It is the practice of optimizing websites to achieve higher rankings in search engine results.',
              },
            },
            // Add more FAQs as needed
          ],
        }}
      />
      <JsonLd<Article>
        item={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'SEO Docs - Learn Search Engine Optimization',
          author: {
            '@type': 'Person',
            name: 'Your Name',
          },
          datePublished: '2023-10-13',
          dateModified: '2023-10-14',
          image: 'https://your-domain.com/og-image.jpg',
          mainEntityOfPage: 'https://your-domain.com',
          publisher: {
            '@type': 'Organization',
            name: 'SEO Docs',
            logo: {
              '@type': 'ImageObject',
              url: 'https://your-domain.com/logo.png',
            },
          },
        }}
      />
      <JsonLd<SiteNavigationElement>
        item={{
          '@context': 'https://schema.org',
          '@type': 'SiteNavigationElement',
          name: ['Home', 'About', 'Contact', 'Blog'],
          url: [
            'https://your-domain.com',
            'https://your-domain.com/about',
            'https://your-domain.com/contact',
            'https://your-domain.com/blog',
          ],
        }}
      />
      <Layout />
    </>
  );
}

export default HomePage;
