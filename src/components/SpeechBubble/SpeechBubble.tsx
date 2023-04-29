import { classNames } from "primereact/utils";
import styles from "./SpeechBubble.module.css";

type Props = {
  text: string;
  type: "original" | "translated";
  show: boolean;
  onClick: () => void;
};

export default function SpeechBubble({ text, type, show, onClick }: Props) {
  if (!show) {
    return null;
  }

  return (
    <div className={classNames(type == "original" ? styles.right : styles.left, styles.bubble)} onClick={onClick}>
      <div className={styles.text_wrapper}>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
}
