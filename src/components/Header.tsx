'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50"
    >
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          WithAnalog
        </Link>
        <div className="flex gap-6">
          <Link
            href="/projects"
            className="text-white hover:text-blue-400 transition-colors"
          >
            프로젝트
          </Link>
          <Link
            href="/blog"
            className="text-white hover:text-blue-400 transition-colors"
          >
            블로그
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
