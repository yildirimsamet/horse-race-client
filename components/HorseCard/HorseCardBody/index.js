import styles from "./styles.module.scss";
import { Progress } from "antd";

const HorseCardBody = ({ horse }) => {
  const calculatePercentage = (current, max) => {
    return (current / max) * 100;
  };
  
  return (
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
  );
};
export default HorseCardBody;
