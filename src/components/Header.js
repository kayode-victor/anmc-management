import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../public/anmc-logo.png";
const Header = () => {
  return (
    <header className="sticky-header flex py-2 gap-2 justify-center items-center bg-gray-800">
      <Image src={Logo} alt="logo" className="h-8 w-8" />
      <Link
        href="/"
        className="text-xl uppercase text-white hover:underline hover:underline-offset-4"
      >
        Go back to home
      </Link>
    </header>
  );
};

export default Header;
