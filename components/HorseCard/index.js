import styles from "./styles.module.scss";
import { Progress } from "antd";

const HorseCard = ({ horse }) => {
  const calculatePercentage = (current, max) => {
    return (current / max) * 100;
  };
  const handleDropShadow = (level) => {
    switch (level) {
      case 1:
        return `drop-shadow(2px 3px 4px #0C1618)`;
      case 2:
        return `drop-shadow(2px 3px 5px #367be3)`;
      case 3:
        return `drop-shadow(2px 3px 6px #ffd700)`;
      default:
        return `drop-shadow(2px 3px 4px #0C1618)`;
    }
  };
  const handleHorseTitle = (level) => {
    switch (level) {
      case 1:
        return {
          color: "#0C1618",
          title: "COMMON",
        };
      case 2:
        return {
          color: "#367be3",
          title: "RARE",
        };
      case 3:
        return {
          color: "#ffd700",
          title: "LEGENDARY",
        };
      default:
        return {
          color: "#0C1618",
          title: "COMMON",
        };
    }
  };
  return (
    <div className={styles.horse}>
      <h4
        className={styles.horseTitle}
        style={{ color: handleHorseTitle(horse.level).color }}
      >
        {handleHorseTitle(horse.level).title}
      </h4>
      <div
        style={{
          color: horse.color || "black",
          filter: handleDropShadow(horse.level),
        }}
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
            <Progress
              strokeColor={"#004643"}
              percent={calculatePercentage(horse.age, 10)}
              showInfo={false}
              size="small"
            />
          </div>
          <div className={styles.horsePropertiesItem}>
            <span>Satiety:</span>
            <span>{horse.satiety}</span>
            <Progress
              strokeColor={"#004643"}
              percent={calculatePercentage(horse.satiety, 100)}
              showInfo={false}
              size="small"
            />
          </div>
          <div className={styles.horsePropertiesItem}>
            <span>Fat Ratio:</span>
            <span>{horse.fatRatio}</span>
            <Progress
              strokeColor={"#004643"}
              percent={calculatePercentage(horse.fatRatio, 20)}
              showInfo={false}
              size="small"
            />
          </div>
        </div>
        <div>
          <div className={styles.horsePropertiesItem}>
            <span>Weight:</span>
            <span>{horse.weight}</span>
            <Progress
              strokeColor={"#004643"}
              percent={calculatePercentage(horse.weight, 1000)}
              showInfo={false}
              size="small"
            />
          </div>
          <div className={styles.horsePropertiesItem}>
            <span>Level:</span>
            <span>{horse.level}</span>
            <Progress
              strokeColor={"#004643"}
              percent={calculatePercentage(horse.level, 5)}
              showInfo={false}
              size="small"
            />
          </div>
          <div className={styles.horsePropertiesItem}>
            <span>Experience:</span>
            <span>{horse.experience}</span>
            <Progress
              strokeColor={"#004643"}
              percent={calculatePercentage(horse.experience, 1000)}
              showInfo={false}
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorseCard;
