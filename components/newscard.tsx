import Link from 'next/link'
import React from 'react'

interface NewsCardProps {
  createdAt: string;
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({createdAt, title, description, urlToImage, url}) => {
const date = new Date(createdAt);
const humanReadableDate = date.toLocaleString();
  return (
    <div className='flex gap-2 bg-[#373a50] my-2 p-3 rounded-lg'>
      <div className="basis-1/2 flex flex-col justify-between gap-2">
        <img src={urlToImage} alt='oops image failed to load' className='h-full rounded-lg' />
        <p className=''>{humanReadableDate}</p>
      </div>
      <div className="basis-1/2 flex flex-col items-start justify-between gap-1 w-full">
        <h1 className='font-bold text-start'>{title}</h1>
        <p className='text-start text-sm'>{description}</p>
        <Link href={url} className='bg-[#4f5372] px-3 py-1 rounded-xl'>Read More</Link>
      </div>
    </div>
  )
}

export default NewsCard
