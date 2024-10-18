'use client';
import { Layout } from "@/app/components/layout";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Layout>
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    </Layout>
  );
}