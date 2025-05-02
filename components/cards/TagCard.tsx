import ROUTES from '@/constants/routes';
import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';
import { getDeviconClassName } from '@/lib/utils';
import Image from 'next/image';

interface TagCardProps {
  _id: string | number;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  removable?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  removable,
  isButton,
  handleRemove,
}: TagCardProps) => {
  const iconClass = getDeviconClassName(name);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const content = (
    <>
      <Badge className='subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase flex flex-row gap-2'>
        <div className='flex-center space-x-2'>
          <i className={`${iconClass} text-sm`}>{}</i>
          <span>{name}</span>
        </div>
        {removable && (
          <Image
            src='/icons/close.svg'
            width={12}
            height={12}
            alt='close'
            className='cursor-pointer object-contain invert-0 dark:invert'
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && (
        <p className='small-medium text-dark500_ligth700'>{questions}</p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button className='flex justify-between gap-2' onClick={handleClick}>
        {content}
      </button>
    ) : (
      <Link
        href={ROUTES.TAG(_id.toString())}
        className='flex justify-between gap-2'
      >
        {content}
      </Link>
    );
  }

  // return (

  // )
};

export default TagCard;
