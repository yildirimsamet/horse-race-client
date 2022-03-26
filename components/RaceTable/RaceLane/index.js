import { useRef } from "react";
import RaceHorse from "../RaceHorse";
import styles from "./styles.module.scss";

const RaceLane = ({ isRaceOn, cRaceResult }) => {
  const laneRef = useRef();
  return (
    <div ref={laneRef} className={styles.raceLane}>
      <RaceHorse
        laneWidth={laneRef.current && laneRef.current.offsetWidth}
        cRaceResult={cRaceResult}
        isRaceOn={isRaceOn}
      />
    </div>
  );
};

export default RaceLane;
