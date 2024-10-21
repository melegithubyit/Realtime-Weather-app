'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useFetchLatestNewsQuery } from '@/redux/api/endpoints';
import NewsCard from './newscard';

const NewsSection = () => {
  const { data, isLoading } = useFetchLatestNewsQuery({});
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer || isPaused) return;

    const scrollSpeed = 1; // Adjust for faster or slower auto-scroll

    const autoScroll = () => {
      scrollContainer.scrollTop += scrollSpeed; // Scroll down by 1px at a time

      if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
        scrollContainer.scrollTop = 0; // Reset scroll when it reaches the bottom
      }
    };

    const scrollInterval = setInterval(autoScroll, 50); // Adjust interval for smoothness

    return () => clearInterval(scrollInterval); // Clean up interval on unmount or pause
  }, [isPaused]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      ref={scrollRef}
      className="text-white max-h-screen overflow-y-auto" // Allow manual scrolling
      onMouseEnter={() => setIsPaused(true)} // Pause auto-scroll on hover
      onMouseLeave={() => setIsPaused(false)} // Resume auto-scroll when not hovering
    >
      <div className="news-scroller pb-16">
        {data?.articles.map((article, index) => (
          <div className="news-card-container" key={index}>
            <NewsCard
              createdAt={article.publishedAt}
              title={article.title}
              description={article.description}
              urlToImage={article.urlToImage}
              url={article.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
