'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ScreenshotGalleryProps {
  screenshots: string[];
  projectTitle: string;
}

export default function ScreenshotGallery({
  screenshots,
  projectTitle,
}: ScreenshotGalleryProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="relative">
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 lg:grid-cols-4"
          >
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[180px] md:w-full snap-start cursor-pointer first:ml-4 last:mr-4 md:first:ml-0 md:last:mr-0"
                onClick={() => {
                  setSelectedImage(index);
                  setShowModal(true);
                }}
              >
                <div className="relative aspect-[9/19] bg-gray-900 rounded-xl overflow-hidden">
                  <Image
                    src={screenshot}
                    alt={`${projectTitle} 스크린샷 ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 180px, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-full max-w-md aspect-[9/19]">
              <Image
                src={screenshots[selectedImage]}
                alt={`${projectTitle} 스크린샷 ${selectedImage + 1}`}
                fill
                className="object-contain"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                }}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
