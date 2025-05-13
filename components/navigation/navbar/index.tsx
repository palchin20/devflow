import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Theme from './Theme';
import MobileNavigation from './MobileNavigation';
import { auth } from '@/auth';
import UserAvatar from '@/components/UserAvatar';

const Navbar = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  // console.log('userId: ', userId);
  return (
    <nav className='flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12'>
      <Link className='flex items-center gap-1' href='/'>
        <Image
          src='/images/site-logo.svg'
          width={23}
          height={23}
          alt='Dev Flow Logo'
        />
        <p className='h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden'>
          Dev <span className='text-primary-500'>Flow</span>
        </p>
      </Link>
      <p>Global Search</p>
      <div className='flex-between gap-5'>
        <Theme />
        {userId && (
          <UserAvatar
            id={userId}
            name={session.user?.name!}
            imageUrl={session.user?.image!}
          />
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
