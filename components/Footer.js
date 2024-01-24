{/*import styles from './Footer.module.css'*/ }
import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(getAdelaideTime());
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top smoothly
  };
  // Function to get the current time in Adelaide's timezone
  function getAdelaideTime() {
    const adelaideTime = new Date().toLocaleTimeString('en-AU', {
      timeZone: 'Australia/Adelaide',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    return `${adelaideTime} GMT+10:30`;
  }

  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getAdelaideTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <footer className="px-6 sm:px-[4%] 3xl:px-[8%] pb-8 3xl:pb-16 pt-8 sm:pt-[5%] relative bg-[#ffffff] font-mono">
      <div className="grid grid-cols-1 gap-y-7 lg:gap-y-10 md:grid-cols-12 gap-x-10">
        <div className="md:col-span-6 lg:col-span-6 flex flex-col">
          <span className="flex border-b-[1.5px] link-text border-accent-500 pb-1 font-bold uppercase text-secondary-300 mb-3">Navigation</span>
          <div className="flex flex-col gap-y-2 md:gap-y-1">
            <a className="leading-base font-medium block relative overflow-hidden group h-fit link-text text-secondary-100 w-fit" href="/">
              <span className="link1">Home</span>
            </a>
            <a className="leading-base font-medium block relative overflow-hidden group h-fit link-text text-secondary-100 w-fit" href="#about">
              <span className="link1">About</span>
            </a>
            {/*
            <a className="leading-base font-medium block relative overflow-hidden group h-fit link-text text-secondary-100 w-fit" href="#services">
              <span className="link1">Services</span>
            </a>
            */}
            <a className="leading-base font-medium block relative overflow-hidden group h-fit link-text text-secondary-100 w-fit" href="#works">
              <span className="link1">Works</span>
            </a>
            <a className="leading-base font-medium block relative overflow-hidden group h-fit link-text text-secondary-100 w-fit" href="#reviews">
              <span className="link1">Reviews</span>
            </a>
            <a className="leading-base font-medium block relative overflow-hidden group h-fit link-text text-secondary-100 w-fit" href="contact">
              <span className="link1">Contact</span>
            </a>
          </div>
        </div>
        <div className="md:col-span-3 lg:col-span-3 flex flex-col">
          <span className="flex border-b-[1.5px] border-accent-500 pb-1 font-bold uppercase link-text text-secondary-300 mb-3">Socials</span>
          <div className="flex flex-col gap-y-2 md:gap-y-1">
            <a target="_blank" className="font-medium block relative overflow-hidden group h-fit link-text leading-base text-secondary-100 w-fit" href="https://www.linkedin.com/in/elliotkoh1/">
              <span className="link1">Linkedin</span>
            </a>
            <a target="_blank" className="font-medium block relative overflow-hidden group h-fit link-text leading-base text-secondary-100 w-fit" href="https://www.youtube.com/@codekagehq">
              <span className="link1">YouTube</span>
            </a>
            <a target="_blank" className="font-medium block relative overflow-hidden group h-fit link-text leading-base text-secondary-100 w-fit" href="https://www.instagram.com/elliot.koh/">
              <span className="link1">Instagram</span>
            </a>
            <a target="_blank" className="font-medium block relative overflow-hidden group h-fit link-text leading-base text-secondary-100 w-fit" href="https://www.instagram.com/codekage/">
              <span className="link1">CodeKage</span>
            </a>
            <a target="_blank" className="font-medium block relative overflow-hidden group h-fit link-text leading-base text-secondary-100 w-fit" href="https://github.com/proximobinks">
              <span className="link1">Github</span>
            </a>
          </div>
        </div>
        <div className="md:col-span-3 lg:col-span-3 flex flex-col">
          <span className="flex border-b-[1.5px] border-accent-500 pb-1 font-bold uppercase link-text text-secondary-300 mb-3">Resources</span>
          <div className="flex flex-col gap-y-2 md:gap-y-1">
            <a target="_blank" className="font-medium block relative overflow-hidden group h-fit link-text leading-base text-secondary-100 w-fit" href="https://elliotkoh1.netlify.app/">
              <span className="link1">Portfolio V1</span>
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-10 mt-14 items-end">
        <span className="order-last xs:mt-10 sm:order-first md:col-span-6 col-span-8 lg:col-span-6 font-bold text-h3 sm:text-h1 lg:text-display-3 tracking-heading uppercase leading-[90%]" style={{ wordSpacing: '-0.3em' }}>
          © {new Date().getFullYear()}
          <br className="block" />
          Elliot Koh
        </span>
        <div className="gap-x-3 md:col-span-3 col-span-4 mb-3 sm:mb-0 lg:col-span-3 flex flex-col link-text">
          <span className="font-bold uppercase">Local time</span>
          <span className="font-medium text-secondary-100 uppercase">{currentTime}</span>
        </div>
        <div className="w-full md:col-span-3 lg:col-span-3 h-fit flex justify-end">
          <button
            aria-label="Scroll to top"
            className="w-fit hidden p-10 hover:scale-90 duration-1000 ease-expo bg-accent-500 group md:flex flex-col relative items-center justify-center rounded-full overflow-hidden bg-[#8fb4dc]"
            onClick={scrollToTop} // Call the scrollToTop function on button click
          >
            <span className="absolute flex group-hover:-translate-y-20 transition-all ease-in-out-cubic duration-500">
              <img
                alt=""
                loading="lazy"
                width="26"
                height="28"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/arrow.svg"
              />
            </span>
            <span className="absolute flex translate-y-20 group-hover:translate-y-0 transition-all ease-in-out-cubic duration-500">
              <img
                alt=""
                loading="lazy"
                width="26"
                height="28"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/arrow.svg"
              />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}