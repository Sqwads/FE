import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "../Button"

const Navbar = () => {
  return (
    <nav
      className="flexBetween  
          px-6 py-4 bg-blue-950 rounded-lg relative z-30 mb-7 shadow-md"
    >
      <Link href='/'>
        <Image src="/images/sqwads-logo.png" alt="logo" width={200} height={50} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key} className="regular-16 text-blue-50
               flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>

      {/* Get Started Button */}
      <div className="hidden lg:flex items-center">
        <Button
          type="button"
          title="Get Started"
          icon="/arrow.svg"
          variant="blue"
        />
      </div>


    </nav>
  )
}

export default Navbar
