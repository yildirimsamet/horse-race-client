import RaceCardFooter from "./RaceCardFooter";
import RaceCardHeader from "./RaceCardHeader";
import RaceCardRacerList from "./RaceCardRacerList";
import styles from "./styles.module.scss";

const RaceCard = ({ race }) => {
  const { id, statu, currentCount, maxCount, startTime, price, users } = race;

  return (
    <div className={styles.race}>
      <RaceCardHeader
        id={id}
        statu={statu}
        startTime={startTime}
        currentCount={currentCount}
        maxCount={maxCount}
        price={price}
      />
      <RaceCardRacerList race={race} users={users} />
      <RaceCardFooter race={race} />
    </div>
  );
};
export default RaceCard;
