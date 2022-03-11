import styles from "./styles.module.scss";
import { Progress } from "antd";
const HorseCard = ({ horse }) => {
  console.log("horse", horse);
  const calculatePercentage = (current, max) => {
    return (current / max) * 100;
  };
  return (
    <div className={styles.horse}>
      <div
        style={{ color: horse.color || "black" }}
        className={styles.horseImg}
      >
        🐎
      </div>
      <div className={styles.horseName}>{horse.name}</div>
      <div className={styles.horseProperties}>
        <div>
          <div className={styles.horsePropertiesItem}>
            <span>Age:</span>
            <span>{horse.age}</span>
          </div>
          <div className={styles.horsePropertiesItem}>
            <span>Satiety:</span>
            <span>{horse.satiety}</span>
          </div>
        </div>
        <div>
          <div className={styles.horsePropertiesItem}>
            <span>Weight:</span>
            <span>{horse.weight}</span>
          </div>
          <div className={styles.horsePropertiesItem}>
            <span>Level:</span>
            <span>{horse.level}</span>
          </div>
        </div>
      </div>
      <div className={styles.horseProgress}>
        <Progress
          strokeColor={"#004643"}
          percent={calculatePercentage(horse.experience, 1000)}
          showInfo={false}
          size="small"
        />
      </div>
    </div>
  );
};

export default HorseCard;
