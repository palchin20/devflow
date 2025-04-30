import ROUTES from '@/constants/routes';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import TagCard from '../cards/TagCard';
import { hotQuestions, popularTags } from '@/constants/data';

const RightSideBar = () => {
  return (
    <section className='pt-36 custom-scrollbar background-light900_dark200 ligth-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <div>
        <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
        <div className='mt-7 flex flex-col w-full gap-[30px]'>
          {hotQuestions.map(({ question, _id }) => (
            <Link
              href={ROUTES.QUESTION(_id.toString())}
              key={_id}
              className='flex cursor-pointer items-center justify-between gap-7'
            >
              <p className='body-medium text-light500_dark700'>{question}</p>
              <Image
                src='/icons/chevron-right.svg'
                alt='Chevron'
                width={20}
                height={20}
                className='inverted-colors'
              />
            </Link>
          ))}
        </div>
      </div>
      <div className='mt-16'>
        <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
        <div className='mt-7 flex flex-col gap-4'>
          {popularTags.map(({ _id, name, questions }) => (
            <TagCard
              key={_id}
              _id={_id}
              questions={questions}
              name={name}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
