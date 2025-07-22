"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Typography, Card, Button } from 'antd';
import { fetchNewsByName } from '../component/fetchNews';

const NewsDetail = () => {
  const router = useRouter();
  const { newsname } = router.query;
  const [newsDetails, setNewsDetails] = useState(null);

  useEffect(() => {
    if (!newsname) return;

    const getNewsDetails = async () => {
      try {
        const newsData = await fetchNewsByName(newsname);
        console.log(newsData[0])
        setNewsDetails(newsData[0]);
      } catch (err) {
        setNewsDetails(null);
      }
    };

    getNewsDetails();
  }, [newsname]);

  if (!newsDetails) {
    return <Typography.Paragraph>No news details found.</Typography.Paragraph>;
  }

  return (
    <div className="font-sans antialiased p-4 max-w-4xl mx-auto">
      <Card className="shadow-lg rounded-lg p-6">
        <Typography.Title level={2}>{newsDetails.title}</Typography.Title>
        <Typography.Text>Author: {newsDetails.author || 'Unknown'}</Typography.Text><br />
        <Typography.Text>Source: {newsDetails.source?.id || ''}, {newsDetails.source?.name || ''}</Typography.Text><br />
        <Typography.Text>Published At: {newsDetails.publishedAt || 'Unknown'}</Typography.Text>
        <Typography.Paragraph className="mt-4">
          {newsDetails.content || newsDetails.description || 'No content available.'}
        </Typography.Paragraph>
        {newsDetails.url && (
          <Typography.Paragraph>
            Read more at: <a href={newsDetails.url} target="_blank" rel="noopener noreferrer">{newsDetails.url}</a>
          </Typography.Paragraph>
        )}

        <div className="mt-4">
          <Link href="/" className="text-blue-600 hover:underline">
            <Button className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]">
              Back To Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default NewsDetail;
