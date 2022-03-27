import RaceLane from "./RaceLane";
import styles from "./styles.module.scss";

const RaceTable = ({ cRaceResults, isRaceOn }) => {
  return (
    <div className={styles.raceTable}>
      {cRaceResults.map((cRaceResult, index) => {
        return (
          <RaceLane cRaceResult={cRaceResult} isRaceOn={isRaceOn} key={index} />
        );
      })}
    </div>
  );
};

export default RaceTable;
