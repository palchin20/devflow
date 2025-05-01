import ROUTES from '@/constants/routes';
import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';
import { getDeviconClassName } from '@/lib/utils';

interface TagCardProps {
  _id: string | number;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
}: TagCardProps) => {
  const iconClass = getDeviconClassName(name);
  return (
    <Link
      href={ROUTES.TAG(_id.toString())}
      className='flex justify-between gap-2'
    >
      <Badge className='subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase'>
        <div className='flex-center space-x-2'>
          <i className={`${iconClass} text-sm`}>{}</i>
          <span>{name}</span>
        </div>
      </Badge>
      {showCount && (
        <p className='small-medium text-dark500_ligth700'>{questions}</p>
      )}
    </Link>
  );
};

export default TagCard;
