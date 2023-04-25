import Image from "next/image";
import Link from "next/link";
import logo from "public/pg-logo.png";
import styles from "./AppHeader.module.css";
import { classNames } from "primereact/utils";
import { useRouter } from "next/router";

type Props = {
  className: string;
};

export default function AppHeader({ className }: Props) {
  const router = useRouter();
  const navigateHome = () => {
    router.push("/");
  };

  return (
    <header className={classNames(styles.header_wrapper, className)}>
      <Image src={logo} alt="application logo" className={styles.img_logo} onClick={navigateHome} />
      <div className={styles.nav_background}>
        <Link className={styles.nav_link} href="/about">
          About Us
        </Link>
      </div>
    </header>
  );
}
