import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import ROUTES from '@/constants/routes';
import { Button } from '@/components/ui/button';
import NavLinks from './NavLinks';
import { auth, signOut } from '@/auth';
import { LogOut } from 'lucide-react';

const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src='/icons/hamburger.svg'
          alt='Menu'
          width={36}
          height={36}
          className='invert-colors sm:hidden'
        />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='background-light900_dark200 border-none pb-16'
      >
        <SheetHeader>
          <SheetTitle className='hidden'>Navigation</SheetTitle>
          <Link href='/' className='flex items-center gap-1'>
            <Image
              src='/images/site-logo.svg'
              alt='Logo'
              width={23}
              height={23}
            />
            <p className='h2-bold font-space-grotesk text-dark-100 dark:text-light-900'>
              Dev<span className='text-primary-500'>Flow</span>
            </p>
          </Link>
          <div className='no-scrollbar flex flex-col justify-between h-[calc(100vh-80px)] overflow-y-auto'>
            <SheetClose asChild>
              <section className='flex flex-col h-full pt-16 gap-6'>
                <NavLinks isMobileNav />
              </section>
            </SheetClose>
            <div className='flex flex-col gap-3'>
              {userId ? (
                <SheetClose asChild>
                  <Button
                    onClick={async () => {
                      'use server';
                      console.log('Signing out user: ', userId);
                      await signOut();
                    }}
                    className='base-medium w-full !bg-transparent px-4 py-3'
                  >
                    <LogOut className='size-6 text-black dark:text-white' />
                    <span className='text-dark300_light900'>Logout</span>
                  </Button>
                </SheetClose>
              ) : (
                <>
                  <SheetClose asChild>
                    <Link href={ROUTES.SIGN_IN}>
                      <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                        <span className='primary-text-gradient'>Log In</span>
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href={ROUTES.SIGN_UP}>
                      <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none'>
                        Sign Up
                      </Button>
                    </Link>
                  </SheetClose>
                </>
              )}
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
