'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // household-items 페이지에서는 헤더를 숨김
  if (pathname === '/household-items') {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50"
    >
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white" onClick={closeMenu}>
          WithAnalog
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          <Link
            href="/tools"
            className="text-white hover:text-blue-400 transition-colors"
          >
            도구
          </Link>
          <Link
            href="/typing-practice"
            className="text-white hover:text-blue-400 transition-colors"
          >
            타자 연습
          </Link>

          <Link
            href="/recommendations"
            className="text-white hover:text-blue-400 transition-colors"
          >
            키보드 추천
          </Link>


        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-blue-400 transition-colors"
          aria-label="메뉴 토글"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-sm border-t border-gray-700"
      >
        <div className="px-4 py-2 space-y-1">
          <Link
            href="/tools"
            className="block px-3 py-2 text-white hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-colors"
            onClick={closeMenu}
          >
            🔧 도구
          </Link>
          <Link
            href="/typing-practice"
            className="block px-3 py-2 text-white hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-colors"
            onClick={closeMenu}
          >
            ⌨️ 타자 연습
          </Link>

          <Link
            href="/recommendations"
            className="block px-3 py-2 text-white hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-colors"
            onClick={closeMenu}
          >
            💡 키보드 추천
          </Link>


        </div>
      </motion.div>
    </motion.header>
  );
}
