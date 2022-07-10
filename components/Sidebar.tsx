import Image from 'next/image';
import SidebarRow from './SidebarRow';
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline';

const Sidebar = () => {
  return (
    <div className='col-span-2 flex flex-col items-center pt-3 px-4 md:items-start md:pt-0'>
      <Image
        src='https://links.papareact.com/drq'
        width={40}
        height={40}
        objectFit='contain'
        className=' object-left'
      />
      <SidebarRow Icon={HomeIcon} title='Home' />
      <SidebarRow Icon={HashtagIcon} title='Explore' />
      <SidebarRow Icon={BellIcon} title='Notifications' />
      <SidebarRow Icon={MailIcon} title='Messages' />
      <SidebarRow Icon={BookmarkIcon} title='Bookmarks' />
      <SidebarRow Icon={CollectionIcon} title='Lists' />
      <SidebarRow Icon={UserIcon} title='Sign In' />

      <SidebarRow Icon={DotsCircleHorizontalIcon} title='More' />
    </div>
  );
};

export default Sidebar;
