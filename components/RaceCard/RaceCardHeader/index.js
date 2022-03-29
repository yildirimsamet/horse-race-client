import styles from "./styles.module.scss";
import { Statistic } from "antd";
import { GiTwoCoins } from "react-icons/gi";
import { useState } from "react";
import { useRaces } from "../../contexts/RacesContext";
import axios from "../../../utils/axios";
import END_POINTS from "../../../config/END_POINTS.json";
import getConfigForClient from "../../../utils/getConfigForClient";
const { Countdown } = Statistic;

const RaceCardHeader = ({
  id,
  currentCount,
  maxCount,
  statu,
  startTime,
  price,
}) => {
  const [cStatu, setCStatu] = useState(statu);
  const { setCRaces } = useRaces();
  const onFinish = () => {
    setCStatu(1);
    setTimeout(async () => {
      const { data } = await axios.get(
        END_POINTS.races.get_races,
        getConfigForClient()
      );
      if (data.success) {
        setCRaces(data.races);
      }
    }, 2000);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerId}>{id}</div>
        <div>
          {cStatu === 0 ? (
            <Countdown
              style={{ fontSize: 10 }}
              className={styles.headerCountdown}
              value={startTime}
              onFinish={onFinish}
            />
          ) : (
            <span style={{ fontSize: 18 }}>Race is Done</span>
          )}
        </div>
        <div className={styles.headerCount}>
          <span>{currentCount}</span>
          <span>/</span>
          <span>{maxCount}</span>
        </div>
      </div>
      <div className={styles.headerPrice}>
        <span>Enter Price:</span> <GiTwoCoins size={20} color="#D1AC00" />{" "}
        {price}
      </div>
    </>
  );
};
export default RaceCardHeader;
