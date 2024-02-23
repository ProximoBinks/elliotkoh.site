import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import styles from './Header.module.css';
import Link from 'next/link';
export default function Header() {
  const router = useRouter(); // Use the useRouter hook

  const smoothScrollToSection = (selector, event, url = '') => {
    // Prevent the default link action if an event is provided
    if (event) {
      event.preventDefault();
    }

    const element = document.querySelector(selector);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (url) {
      // Navigate to the specified URL if the element isn't found
      router.push(url);
    }
  };
  return (
    <header className="h-[100px] header-class relative w-full z-40 top-0 opacity-100 transform-none">
      <nav className="flex flex-row items-start justify-between px-4 sm:px-7 2xl:px-10 py-2 xl:py-4 border-opacity-20 mt-6 xl:mt-8">
        <div className="text-2xl xl:text-4xl flex-grow">
          <Link href="/">
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
            <Link href="/#about" onClick={(e) => smoothScrollToSection('.about-class', e, '/#about')} className="block relative overflow-hidden group h-fit leading-base link-text">
              <span className="link1">About</span>
            </Link>
            <Link href="/#works" onClick={(e) => smoothScrollToSection('.works-class', e, '/#works')} className="block relative overflow-hidden group h-fit leading-base link-text">
              <span className="link1">Works</span>
            </Link>
            <Link className="block relative overflow-hidden group h-fit leading-base link-text" href="/hobbies">
              <span className="link1">Hobbies</span>
            </Link>
            <Link className="block relative overflow-hidden group h-fit leading-base link-text" href="/contact">
              <span className="link1">Contact</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}