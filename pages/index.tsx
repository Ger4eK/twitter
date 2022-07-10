import type { NextPage } from 'next';
import Head from 'next/head';
import Body from '../components/Body';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';

const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>Twitter</title>
        <link rel='icon' href='/twitter.svg' />
      </Head>

      <main>
        <Sidebar />
        <Body />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;
