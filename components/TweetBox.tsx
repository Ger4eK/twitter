import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';

const TweetBox = () => {
  const [input, setInput] = useState('');

  return (
    <div className='flex space-x-2 p-5'>
      <img
        src='https://links.papareact.com/gll'
        className='rounded-full mt-4 h-14 w-14 object-cover'
      />
      <div className='flex flex-1 items-center pl-2 '>
        <form className='flex flex-1 flex-col'>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type='text'
            placeholder="What's"
            className='h-24 w-full text-xl outline-none placeholder:text-xl'
          />
          <div className='flex items-center'>
            <div className='flex space-x-2 text-twitter flex-1 text-xl'>
              <PhotographIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
              <SearchCircleIcon className='h-5 w-5' />
              <EmojiHappyIcon className='h-5 w-5' />
              <CalendarIcon className='h-5 w-5' />
              <LocationMarkerIcon className='h-5 w-5' />
            </div>
            <button
              disabled={!input}
              className='text-white bg-twitter px-5 py-2 font-bold rounded-full disabled:opacity-40'
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
