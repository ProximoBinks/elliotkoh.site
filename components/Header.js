import React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
export default function Header() {
  return (
    <header className="relative w-full z-40 top-0 opacity-100 transform-none">
      <nav className="flex flex-row items-start justify-between px-4 sm:px-7 2xl:px-10 py-2 xl:py-4 border-opacity-20 mt-6 xl:mt-8">
        <div className="text-2xl xl:text-4xl flex-grow">
          <Link href="/" passHref>
            <span className="font-bold ">Elliot</span>
            <span className="font-bold text-gray-500">, Developer</span>
          </Link>
        </div>
        <div className="flex items-start gap-x-20 text-secondary-300">
          <div className="hidden sm:flex">
            <div className={`${styles['avail-status']}`}>
              <div className={`${styles['dot-status']}`}></div>
              <p className="font-[700] text-xs uppercase xl:text-lg text-gray-500">currently available for work</p>
            </div>
          </div>

          <div className="font-[600] text-md xl:text-[24px] flex items-start flex-col gap-y-1">
            <a className="block relative overflow-hidden group h-fit leading-base link-text" href="/#about">
              <span className="link1">About</span>
            </a>
            <a className="block relative overflow-hidden group h-fit leading-base link-text" href="/#works">
              <span className="link1">Works</span>
            </a>
            <a className="block relative overflow-hidden group h-fit leading-base link-text" href="/#reviews">
              <span className="link1">Hobbies</span>
            </a>
            <a className="block relative overflow-hidden group h-fit leading-base link-text" href="/contact">
              <span className="link1">Contact</span>
            </a>
            <Link href="/whiteboard" passHref className="block relative overflow-hidden group h-fit leading-base link-text">
              <span className="link1">White Board</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}