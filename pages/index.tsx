import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>Twitter</title>
        <link rel='icon' href='/twitter.svg' />
      </Head>

      <h1>Twitter</h1>
    </div>
  );
};

export default Home;
