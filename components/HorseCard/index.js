import styles from "./styles.module.scss";
import HorseCardTitle from "./HorseCardTitle";
import HorseCardHero from "./HorseCardHero";
import HorseCardBody from "./HorseCardBody";
import HorseCardFooter from "./HorseCardFooter";
const HorseCard = ({ horse, setCHorses, cHorses, isPreview}) => {
  return (
    <div className={styles.horse}>
      <HorseCardTitle level={horse.level} title={horse.title} />
      <HorseCardHero level={horse.level} color={horse.color} />
      <div className={styles.horseName}>{horse.name}</div>
      <HorseCardBody horse={horse} />
      {!isPreview && <HorseCardFooter cHorses={cHorses} setCHorses={setCHorses} horse={horse}/>}
    </div>
  );
};

export default HorseCard;
