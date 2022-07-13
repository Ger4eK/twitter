import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import Body from '../components/Body';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { Tweet } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';

interface Props {
  tweets: Tweet[];
}

const Home = ({ tweets }: Props) => {
  return (
    <div className='lg:max-w-6xl mx-auto max-h-screen overflow-hidden'>
      <Head>
        <title>Twitter</title>
        <link rel='icon' href='/twitter.svg' />
      </Head>
      <Toaster />
      <main className='grid grid-cols-9'>
        <Sidebar />
        <Body tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  //const tweets = await fetchTweets();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`);

  const data = await res.json();
  const tweets: Tweet[] = data.tweets;

  return {
    props: {
      tweets,
    },
  };
};
