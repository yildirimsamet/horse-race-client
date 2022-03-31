import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import HeaderTitle from "../../HeaderTitle";
import RaceTable from "../../RaceTable";
import Countdown from "antd/lib/statistic/Countdown";
const WatchRaceBody = ({ sRaceResults }) => {
  const [cRaceResults, setCRaceResults] = useState(sRaceResults);
  const [isRaceOn, setIsRaceOn] = useState(false);
  const [timer, setTimer] = useState(true);
  const raceStartTimerDeadline = Date.now() + 4000;
  const handleCountDownFinish = () => {
    setTimer(false);
    setIsRaceOn(true);
  };
  // useEffect(()=>{
  //     const timerInterval = setInterval(()=>{
  //         if(timer > 1) {
  //             setTimer(timer=>timer-1);
  //         } else {
  //             setIsRaceOn(true);
  //             clearInterval(timerInterval);
  //         }
  //     },1000)
  //     return ()=>{
  //         clearInterval(timerInterval);
  //     }
  // },[timer])
  return (
    <div className={styles.watchRace}>
      <HeaderTitle>🎉 Race 🎉</HeaderTitle>
      <div
        style={{
          textAlign: "center",
          fontSize: 18,
          marginBottom: 5,
          fontWeight: "bold",
        }}
      >
        <div style={{
            maxHeight: 28,
            marginBottom: 15,
            fontSize: 18,
        }}>
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
