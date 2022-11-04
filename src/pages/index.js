import React from 'react';
import Layout from '@theme/Layout';
import Signup from '@site/src/components/Signup';
import Samples from '@site/src/components/Samples';
import Features from '@site/src/components/Features';
import HomeHero from '@site/src/components/HomeHero';

export default function Home() {

  return (
    <div className="main-bg margin-top-none">
      <Layout>
          <HomeHero />
          <main className="main">
            <Features />
            <Samples />
            <Signup />
          </main>
      </Layout>
    </div>
  );
}
