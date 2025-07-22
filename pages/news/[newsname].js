"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Card } from 'antd';
import { fetchNewsByName } from '../component/fetchNews';
import Link from 'next/link';
const NewsDetail = () => {
  const router = useRouter();
  const { newsname } = router.query;
  const [newsDetails, setNewsDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!newsname) return;

    const getNewsDetails = async () => {
      setLoading(true);
      const newsData = await fetchNewsByName(newsname);
      if (newsData && newsData.length > 0) {
        const article = newsData.find(
          (item) => item.title === newsname
        ) || newsData[0];
        setNewsDetails(article);
      } else {
        setNewsDetails(null);
      }
      setLoading(false);
    };

    getNewsDetails();
  }, [newsname]);

  if (loading) {
    return <Typography.Paragraph>Loading news details...</Typography.Paragraph>;
  }

  if (!newsDetails) {
    return <Typography.Paragraph>No news details found.</Typography.Paragraph>;
  }

  return (
    <div className="font-sans antialiased p-4 max-w-4xl mx-auto">
      <Card className="shadow-lg rounded-lg p-6">
        <Typography.Title level={2}>{newsDetails.title}</Typography.Title>
        <Typography.Paragraph>
          {newsDetails.content || newsDetails.description || 'No content available.'}
        </Typography.Paragraph>
        {newsDetails.url && (
          <Typography.Paragraph>
            Read more at: <a href={newsDetails.url} target="_blank" rel="noopener noreferrer">{newsDetails.url}</a>
          </Typography.Paragraph>
        )}
      </Card>
    </div>
  );
};

export default NewsDetail;
