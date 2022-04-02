import styles from "./styles.module.scss";
import { useState } from "react";
import HeaderTitle from "../../HeaderTitle";
import RaceTable from "../../RaceTable";
import Countdown from "antd/lib/statistic/Countdown";

const WatchRaceBody = ({ sRaceResults }) => {
  const [cRaceResults, setCRaceResults] = useState(sRaceResults);
  const [isRaceOn, setIsRaceOn] = useState(false);
  const [timer, setTimer] = useState(true);
  const raceStartTimerDeadline = Date.now() + 2000;
  const handleCountDownFinish = () => {
    setTimer(false);
    setIsRaceOn(true);
  };
  return (
    <div className={styles.watchRace}>
      <HeaderTitle>🎉 Race 🎉</HeaderTitle>
      <div className={styles.watchRaceHeader} style={{}}>
        <div
          style={{
            maxHeight: 28,
            marginBottom: 15,
            fontSize: 18,
          }}
        >
          {timer ? (
            <Countdown
              onFinish={handleCountDownFinish}
              value={raceStartTimerDeadline}
              format="s"
            />
          ) : (
            "Start"
          )}
        </div>
      </div>
      <RaceTable isRaceOn={isRaceOn} cRaceResults={cRaceResults} />
    </div>
  );
};

export default WatchRaceBody;
