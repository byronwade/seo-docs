import React from 'react';
import { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { JsonLd } from 'react-schemaorg';
import { WebSite, BreadcrumbList, FAQPage } from 'schema-dts';

export const metadata: Metadata = {
  title: 'SEO Docs - Learn Search Engine Optimization',
  description: 'Comprehensive guide to SEO best practices, techniques, and strategies to improve your website\'s search engine rankings.',
  keywords: 'SEO, search engine optimization, digital marketing, website ranking',
  openGraph: {
    title: 'SEO Docs - Master Search Engine Optimization',
    description: 'Learn SEO techniques to boost your website\'s visibility and traffic.',
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
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Docs - Expert SEO Guidance',
    description: 'Elevate your website\'s performance with our comprehensive SEO resources.',
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
};

function HomePage() {
  return (
    <>
      <JsonLd<WebSite>
        item={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "SEO Docs",
          url: "https://your-domain.com",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://your-domain.com/search?q={search_term_string}"
            },
          }
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://your-domain.com"
          }]
        }}
      />
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{
            "@type": "Question",
            name: "What is SEO?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "SEO stands for Search Engine Optimization. It's the practice of optimizing websites to make them reach a high position in Google's (or another search engine's) search results."
            }
          }]
        }}
      />
      <Layout />
    </>
  );
}

export default HomePage;
