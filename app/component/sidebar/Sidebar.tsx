'use client';
import Link from 'next/link';
import { AiOutlineProduct } from 'react-icons/ai';
import { FaCartArrowDown } from 'react-icons/fa';

export const Sidebar = () => {
  return (
    <nav className='sticky top-14 flex flex-col items-center gap-4 px-2 py-4 h-screen bg-blue-500 dark:bg-black'>
      <Link href='/'>
        <span>
          <AiOutlineProduct size={20} className='dark:text-white' />
        </span>
      </Link>
      <Link href='/cart'>
        <span>
          <FaCartArrowDown size={20} className='dark:text-white' />
        </span>
      </Link>
    </nav>
  );
};
