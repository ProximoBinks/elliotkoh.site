import React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
export default function Header() {
  return (
    <header className="bg-white relative w-full tracking-body z-40 top-0 font-mono" style={{ opacity: 1, transform: 'none' }}>
      <nav className="px-4 sm:px-7 2xl:px-10 pb-2 xl:pb-4 2xl:pb-6 border-opacity-20 mt-6 xl:mt-8 2xl:mt-10  flex items-start justify-between">
        <div className="text-xl xl:text-3xl">
          <Link href="/" passHref>
            <span className="font-bold ">Elliot</span>
            <span className="font-bold text-gray-300">, Developer</span>
          </Link>
        </div>
        <div className="flex items-center gap-x-20 text-secondary-300">
          <div className="mt-[-17%] hidden sm:flex ">
            <div className={`${styles['avail-status']}`}>
              <div className={`${styles['dot-status']}`}></div>
              <p className="text-xs uppercase xl:text-lg text-gray-400">currently available for work</p>
            </div>
          </div>

          <div className="text-sm xl:text-[24px] flex items-start flex-col gap-y-1 xl:gap-y-4">
            <a className="font-medium block relative overflow-hidden group h-fit leading-base link-text" href="/#about">
              <span className="link1">About</span>
            </a>
            {/*
            <a className="font-medium block relative overflow-hidden group h-fit leading-base link-text" href="/#services">
              <span className="link1">Services</span>
            </a>*/}
            <a className="font-medium block relative overflow-hidden group h-fit leading-base link-text" href="/#works">
              <span className="link1">Works</span>
            </a>
            <a className="font-medium block relative overflow-hidden group h-fit leading-base link-text" href="/#reviews">
              <span className="link1">Hobbies</span>
            </a>
            <a className="font-medium block relative overflow-hidden group h-fit leading-base link-text" href="/contact">
              <span className="link1">Contact</span>
            </a>
            <Link href="/whiteboard" passHref className="font-medium block relative overflow-hidden group h-fit leading-base link-text">
              <span className="link1">White Board</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
