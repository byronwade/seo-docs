import { Layout } from '@/components/layout';

export const metadata = {
  title: 'Home - SEO Docs',
  description: 'Welcome to the SEO Docs home page.',
};

const HomePage = () => {
  return (
    <Layout>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Welcome to SEO Docs</h1>
        <p className="text-xl text-muted-foreground">Your ultimate guide to mastering Search Engine Optimization.</p>
      </div>
    </Layout>
  );
};

export default HomePage;
