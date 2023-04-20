import Image from "next/image";
import Link from "next/link";
import logo from "public/pg-logo.png";

export default function AppHeader() {
  return (
    <header className="flex flex-row h-5rem justify-content-between">
      <Image src={logo} alt="application logo" className="img-logo h-5rem w-5rem" />
      <div className="bg-white w-5 mb-2 nav-background">
        <Link href="/about">About Us</Link>
      </div>
    </header>
  );
}
