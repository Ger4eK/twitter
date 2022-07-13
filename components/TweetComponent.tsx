import { Comment, CommentBody, Tweet } from '../typings';
import TimeAgo from 'react-timeago';
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import { fetchComments } from '../utils/fetchComments';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  tweet: Tweet;
}

const TweetComponent = ({ tweet }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [input, setInput] = useState('');

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToast = toast.loading('Posting Comment...');

    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: 'Oleh Hreskiv',
      profileImg:
        'https://play-lh.googleusercontent.com/uh-YyABDPOU_NdZno8Eq11YkNu6BGNButL4YApda9rzc1YAHcLJyFYv7_yEy-s9Tbg',
    };

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: 'POST',
    });
    toast.success('Comment Posted!', {
      id: commentToast,
    });

    setInput('');
    setCommentBoxVisible(false);
    refreshComments();
  };

  return (
    <div
      key={tweet._id}
      className='flex flex-col space-x-3 border-y p-5 border-gray-100'
    >
      <div className='flex space-x-3 '>
        <img
          src={tweet.profileImg}
          alt='Profile Image'
          className='h-10 w-10 rounded-full object-cover'
        />
        <div>
          <div className='flex items-center space-x-1'>
            <p className='mr-1 font-bold'>{tweet.username}</p>
            <p className='hidden text-sm text-gray-500 sm:inline'>
              @{tweet.username.replace(/\s+/g, '').toLowerCase()}
            </p>
            <TimeAgo
              date={tweet._createdAt}
              className='text-sm text-gray-500'
            />
          </div>
          <p>{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt='Tweet Image'
              className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm'
            />
          )}
        </div>
      </div>
      <div className='flex justify-between mt-5'>
        <div
          onClick={() => setCommentBoxVisible(!commentBoxVisible)}
          className='flex cursor-pointer items-center space-x-3 text-gray-400'
        >
          <ChatAlt2Icon className='h-5 w-5' />
          <p>{comments.length}</p>
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <SwitchHorizontalIcon className='h-5 w-5' />
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <HeartIcon className='h-5 w-5' />
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <UploadIcon className='h-5 w-5' />
        </div>
      </div>

      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className=' mt-3 flex space-x-3'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Write a comment...'
            className='flex-1 rounded-lg bg-gray-100 p-2 outline-none'
          />
          <button
            disabled={!input}
            type='submit'
            className=' text-twitter disabled:text-gray-200'
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className='my-2 mt-5  space-y-5 overflow-y-scroll max-h-[215..px] scrollbar-hide border-t border-gray-100 p-5'>
          {comments.map((comment) => (
            <div key={comment._id} className=' relative flex space-x-2'>
              <hr className='absolute left-5 top-10 h-8 border-x border-twitter/30' />
              <img
                src={comment.profileImg}
                alt='Profile Image'
                className=' mt-2 h-7 w-7 rounded-full object-cover'
              />
              <div>
                <div className='flex items-center space-x-1'>
                  <p className='mr-1 font-bold'>{comment.username}</p>
                  <p className='hidden text-sm text-gray-500 lg:inline '>
                    @{comment.username.replace(/\s+/g, '').toLowerCase()}
                  </p>
                  <TimeAgo
                    date={comment._createdAt}
                    className='text-sm text-gray-500'
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TweetComponent;
