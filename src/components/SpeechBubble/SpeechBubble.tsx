import { classNames } from "primereact/utils";
import styles from "./SpeechBubble.module.css";

type Props = {
  text: string;
  type: "original" | "translated";
  show: boolean;
  className: string;
  onClick: () => void;
};

export default function SpeechBubble({ text, type, show, className, onClick }: Props) {
  if (!show) {
    return null;
  }

  return (
    <div
      className={classNames(type == "original" ? styles.right : styles.left, styles.bubble, className)}
      onClick={onClick}
    >
      <div className={styles.text_wrapper}>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
}
