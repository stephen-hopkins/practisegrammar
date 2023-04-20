import { classNames } from "primereact/utils";
import styles from "./SpeechBubble.module.css";

type Props = {
  text: string;
  type: "original" | "translated";
  show: boolean;
};

export default function SpeechBubble({ text, type, show }: Props) {
  return (
    <div className={classNames({ hidden: !show }, type == "original" ? styles.right : styles.left, styles.bubble)}>
      <div className={styles.text_wrapper}>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
}
