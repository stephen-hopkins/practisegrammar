import Image from "next/image";
import Link from "next/link";
import logo from "public/pg-logo.png";
import styles from "./AppHeader.module.css";
import { useRouter } from "next/router";

export default function AppHeader() {
  const router = useRouter();
  const navigateHome = () => {
    router.push("/");
  };

  return (
    <header className={styles.header_wrapper}>
      <Image src={logo} alt="application logo" className={styles.img_logo} onClick={navigateHome} />
      <div className={styles.nav_background}>
        <Link className={styles.nav_link} href="/about">
          About Us
        </Link>
      </div>
    </header>
  );
}
