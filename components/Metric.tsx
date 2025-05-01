import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MetricProps {
  title: string;
  value: string | number;
  href?: string;
  imgUrl: string;
  alt: string;
  textStyles: string;
  imageStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  title,
  value,
  href,
  imgUrl,
  alt,
  textStyles,
  imageStyles,
  isAuthor = false,
}: MetricProps) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        className={`rounded-full object-contain ${imageStyles}`}
        width={16}
        height={16}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}
        >
          {title}
        </span>
      </p>
    </>
  );

  return href ? (
    <Link href={href} className='flex-center gap-1'>
      {metricContent}
    </Link>
  ) : (
    <div className='flex-center gap-1'>{metricContent}</div>
  );
};

export default Metric;
