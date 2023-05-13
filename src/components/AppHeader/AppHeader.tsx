"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "public/pg-logo.png";
import styles from "./AppHeader.module.css";

export default function AppHeader() {
  return (
    <header className={styles.header_wrapper}>
      <Link href="/">
        <Image src={logo} alt="application logo" className={styles.img_logo} />
      </Link>
      <div className={styles.nav_background}>
        <Link className={styles.nav_link} href="/about">
          About Us
        </Link>
      </div>
    </header>
  );
}
