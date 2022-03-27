import styles from "./styles.module.scss";
import HeaderTitle from "../../HeaderTitle";
import RaceCard from "../../RaceCard";
import { useRaces } from "../../contexts/RacesContext";
import { useEffect } from "react";
const RacesBody = ({ sRaces }) => {
  const { cRaces, setCRaces } = useRaces();
  useEffect(() => {
    setCRaces(sRaces);
  }, [sRaces]);
  return (
    <div className={styles.races}>
      <HeaderTitle>🏁 Races 🏁</HeaderTitle>
      <div className={styles.racesGrid}>
        {cRaces.map((race) => (
          <RaceCard key={race.id} race={race} />
        ))}
      </div>
    </div>
  );
};

export default RacesBody;
