import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Tweet, TweetBody } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

const TweetBox = ({ setTweets }: Props) => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState('');

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState(false);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = '';
    setImageUrlBoxIsOpen(false);
  };

  const postTweet = async () => {
    const tweetBody: TweetBody = {
      text: input,
      username: 'Oleh Hreskiv',
      profileImg:
        'https://play-lh.googleusercontent.com/uh-YyABDPOU_NdZno8Eq11YkNu6BGNButL4YApda9rzc1YAHcLJyFYv7_yEy-s9Tbg',
      image: image,
    };

    const result = await fetch(`api/addTweet`, {
      body: JSON.stringify(tweetBody),
      method: 'POST',
    });

    const json = await result.json();
    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast('Tweet Posted', {
      icon: '🚀',
    });
    return json;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    postTweet();
    setInput('');
    setImage('');
    setImageUrlBoxIsOpen(false);
  };

  return (
    <div className='flex space-x-2 p-5'>
      <img
        src='https://play-lh.googleusercontent.com/uh-YyABDPOU_NdZno8Eq11YkNu6BGNButL4YApda9rzc1YAHcLJyFYv7_yEy-s9Tbg'
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
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'
              />
              <SearchCircleIcon className='h-5 w-5' />
              <EmojiHappyIcon className='h-5 w-5' />
              <CalendarIcon className='h-5 w-5' />
              <LocationMarkerIcon className='h-5 w-5' />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input}
              className='text-white bg-twitter px-5 py-2 font-bold rounded-full disabled:opacity-40'
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <form className=' mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
              <input
                ref={imageInputRef}
                type='text'
                placeholder='Enter Image URL...'
                className='flex-1 bg-transparent p-2 text-white outline-none placeholder-white'
              />
              <button
                type='submit'
                onClick={addImageToTweet}
                className='font-bold text-white'
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              src={image}
              alt='Tweet Image'
              className=' mt-10 h-40 w-full rounded-xl object-contain shadow-lg '
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
