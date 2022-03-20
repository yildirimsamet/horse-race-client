import styles from "./styles.module.scss";
import HorseCardTitle from "./HorseCardTitle";
import HorseCardHero from "./HorseCardHero";
import HorseCardBody from "./HorseCardBody";
import HorseCardFooter from "./HorseCardFooter";
import cn from "classnames";
import {useRouter} from 'next/router';
const HorseCard = ({ horse, setCHorses, cHorses, isPreview}) => {
  const router = useRouter();
  const sendToMarket = () => {
    router.push("/horse-shop")
  }
  return (
    <div onClick={horse.isOnMarket ? sendToMarket : null} className={cn(styles.horse, horse.isOnMarket && styles.horseOnSell)}>
      <HorseCardTitle level={horse.level} title={horse.title} />
      <HorseCardHero level={horse.level} color={horse.color} />
      <div className={styles.horseName}>{horse.name}</div>
      <HorseCardBody horse={horse} />
      {!isPreview && <HorseCardFooter cHorses={cHorses} setCHorses={setCHorses} horse={horse}/>}
    </div>
  );
};

export default HorseCard;
