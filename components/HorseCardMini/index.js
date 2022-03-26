import styles from "./styles.module.scss";
import cn from "classnames";

const HorseCardMini = ({ className, color }) => {
  return (
    <div
      style={{ color: color || "#FAF4D3" }}
      className={cn(styles.wrapper, className && className)}
    >
      🐎
    </div>
  );
};

export default HorseCardMini;
