import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"

const Navbar = () => {
  return (
    <nav className="flexBetween max-container 
    px-6 py-4 bg-blue-950 rounded-lg relative z-30 m-10 shadow-md">
      <Link href='/'>
          <Image src="/sqwads.svg" alt="logo" width={74} height={29} />
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

      <Image
        src="menu.svg"
        alt="menu"
        width={32} 
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  )
}

export default Navbar
