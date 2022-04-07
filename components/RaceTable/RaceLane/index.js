import { useRef, useState } from "react";
import RaceHorse from "../RaceHorse";
import styles from "./styles.module.scss";

const RaceLane = ({ isRaceOn, cRaceResult }) => {
  const laneRef = useRef();
  const [showPlacement, setShowPlacement] = useState(false);
  return (
    <div ref={laneRef} className={styles.raceLane}>
      <div className={styles.raceLanePlacement}>
        {showPlacement && cRaceResult.user.finishedAt}
      </div>
      <RaceHorse
        setShowPlacement={setShowPlacement}
        laneWidth={laneRef.current && laneRef.current.offsetWidth}
        cRaceResult={cRaceResult}
        isRaceOn={isRaceOn}
      />
    </div>
  );
};

export default RaceLane;
