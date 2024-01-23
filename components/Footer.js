import styles from './Footer.module.css'
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] p-8 2xl:p-[200px]">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h5 className="text-lg font-bold mb-4 text-[#393632]">NAVIGATION</h5>
          <ul className="space-y-2">
            <li>
              <Link className="text-base hover:underline" href="#">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-base hover:underline" href="#">
                About
              </Link>
            </li>
            <li>
              <Link className="text-base hover:underline" href="#">
                Services
              </Link>
            </li>
            <li>
              <Link className="text-base hover:underline" href="#">
                Works
              </Link>
            </li>
            <li>
              <Link className="text-base hover:underline" href="#">
                Reviews
              </Link>
            </li>
            <li>
              <Link className="text-base hover:underline" href="#">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-lg text-[#393632] font-bold mb-4">SOCIALS</h5>
          <ul className="space-y-2">
            <li>
              <Link className="text-base hover:underline" href="#">
                LinkedIn
              </Link>
            </li>
            <li>
              <Link className="text-base hover:underline" href="#">
                YouTube
              </Link>
            </li>
            <li>
              <Link className="text-base hover:underline" href="#">
                Instagram
              </Link>
            </li>
            <li>
              <Link className="text-base hover:underline" href="#">
                Bento
              </Link>
            </li>
            <li>
              <Link className="text-base hover:underline" href="#">
                Github
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-lg text-[#393632] font-bold mb-4">RESOURCES</h5>
          <ul className="space-y-2">
            <li>
              <Link className="text-base hover:underline" href="#">
                Pillarstack
              </Link>
            </li>
            <li>
              <Link className="text-base hover:underline" href="#">
                Figma Templates
              </Link>
            </li>
            <li>
              <Link className="text-base hover:underline" href="#">
                Portfolio V1
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="sm:min-w-[400px]">
          <div className="text-[30px] sm:text-[50px] md:text-[55px] font-bold sm:mb-[-30px] xs:mb-[-14px]">© 2024</div>
          <div className="text-[30px] sm:text-[50px] md:text-[55px] font-bold">ELLIOT KOH</div>
        </div>
        <div className="md:mt-[67px] sm:mt-[53px] sm:ml-[200px] sm:min-w-[200px]">
          <h5 className="text-lg font-bold mb-1">LOCAL TIME</h5>
          <p className="text-base font-semibold text-[#726b64]">10:28 PM GMT+10:30</p>
        </div>
      <div className="hidden md:flex mt-8 justify-end items-center">
        <ArrowUpIcon className="bg-[#bfbfb1] text-3xl cursor-pointer rounded-full h-[80px] w-[80px] p-5" />
      </div>
      </div>
    </footer>
  )
}

function ArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#524d47"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}
