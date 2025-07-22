"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Typography, Card } from 'antd';
import { fetchNews } from './component/fetchNews';

const HomePage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const newsData = await fetchNews();
      setNews(newsData);
    };
    getNews();
  }, []);

  return (
    <div className="font-sans antialiased">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <Typography.Title level={2} className="text-gray-800 mb-6">
          Latest News
        </Typography.Title>
        <div className="w-full max-w-4xl space-y-4">
          {news.length === 0 ? (
            <Typography.Paragraph>Loading news...</Typography.Paragraph>
          ) : (
            news.map((item, index) => (
              <Card key={index} className="shadow-lg rounded-lg">
                <Typography.Title level={4}>{item.title}</Typography.Title>
                <Typography.Paragraph>
                  {item.description || item.content || 'No description available.'}
                </Typography.Paragraph>
                <Link href={`/berita/${item.title}`}passHref>
                  <Button type="primary" size="small">
                    Read More
                  </Button>
                </Link>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
