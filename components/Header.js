import React from 'react';
import styles from './Header.module.css';
export default function Header() {
  return (
    <header className="bg-white absolute w-full tracking-body z-40 top-0 font-mono" style={{ opacity: 1, transform: 'none' }}>
      <nav className="px-4 sm:px-7 2xl:px-10 pb-2 xl:pb-4 2xl:pb-6 border-opacity-20 mt-6 xl:mt-8 2xl:mt-10  flex items-start justify-between">
        {/*
        <div style={{ transform: 'none' }}>
          <a aria-label="Back to Home" href="/">
            <img
              alt=""
              loading="lazy"
              width="100"
              height="100"
              decoding="async"
              data-nimg="1"
              className="w-12 lg:w-14 2xl:w-20"
              style={{ color: 'transparent' }}
              src="/logo.svg"
            />
          </a>
        </div>*/}
        <div className="text-xl xl:text-3xl">
          <span className="font-bold ">Elliot</span>
          <span className="font-bold text-gray-300">, Developer</span>
        </div>
        <div className="flex items-center gap-x-20 text-secondary-300">
          <div className="xl:mt-[-23%] mt-[-20%] hidden sm:flex ">
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
              <span className="link1">Reviews</span>
            </a>
            <a className="font-medium block relative overflow-hidden group h-fit leading-base link-text" href="/contact">
              <span className="link1">Contact</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
