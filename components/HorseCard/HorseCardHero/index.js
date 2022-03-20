import styles from "./styles.module.scss";
import cn from "classnames";

const HorseCardHero = ({ color, level, style }) => {
  return (
    <div
      style={{
        color: color || "black",
        ...style
      }}
      className={cn(styles.horseImg, styles[`horseImgShadow${level}`])}
    >
      🐎
    </div>
  );
};
export default HorseCardHero;
