'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { applications, Application } from '../data/applications';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const renderAppCard = (app: Application) => (
    <div key={app.id} className="px-4">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Image
            src={app.icon}
            alt={app.name}
            width={64}
            height={64}
            className="rounded-xl mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{app.name}</h2>
            <p className="text-gray-400 text-sm">{app.slogan}</p>
          </div>
        </div>
        <Link href={`/application/${app.id}`}>
          <span className="block w-full bg-blue-500 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            상세보기
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">WITH ANALOG</h1>
        <p className="text-xl">나 자신을 찾으려고 노력하는 사람입니다.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-md"
      >
        {applications.length === 1 ? (
          renderAppCard(applications[0])
        ) : (
          <Slider {...settings}>{applications.map(renderAppCard)}</Slider>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8"
      >
        <Link href="/blog">
          <span className="bg-white text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors">
            BLOG 보러가기
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
