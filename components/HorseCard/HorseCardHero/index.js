import styles from "./styles.module.scss";
import cn from "classnames";

const HorseCardHero = ({ color, level }) => {
  return (
    <div
      style={{
        color: color || "black",
      }}
      className={cn(styles.horseImg, styles[`horseImgShadow${level}`])}
    >
      🐎
    </div>
  );
};
export default HorseCardHero;
