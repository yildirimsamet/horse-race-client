import styles from "./styles.module.scss";
import cn from "classnames";
import { useUser } from "../../../components/contexts/UserContext";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { getEase } from "../../../utils/getEase";
import useWindowType from "../../../hooks/useWindowType";

gsap.registerPlugin(CustomEase);

const RaceHorse = ({ isRaceOn, cRaceResult, laneWidth, setShowPlacement }) => {
  const windowType = useWindowType();
  const { user } = useUser();
  const horseRef = useRef();
  const [isHorseFinished, setIsHorseFinished] = useState(false);
  const { user: raceUser, horse: raceHorse } = cRaceResult;
  const isUserHorse = raceHorse?.ownerId === user?.id;

  useEffect(() => {
    let horseFinishRaceTO;
    if (isRaceOn) {
      horseFinishRaceTO = setTimeout(() => {
        setIsHorseFinished(true);
        setShowPlacement(true);
      }, raceHorse.speed);
    }

    if (horseRef.current && isRaceOn) {
      gsap.to(horseRef.current, {
        duration: raceHorse.speed / 1000,
        ease: CustomEase.create("custom", getEase(raceHorse.speedType)),
        x:
          laneWidth - (windowType === "desktop"
            ? 65
            : windowType === "tablet"
            ? 45
            : 35), //horse widths
      });
    }
    return () => {
      clearTimeout(horseFinishRaceTO);
    };
  }, [horseRef, isRaceOn]);
  return (
    <div
      className={cn(
        styles.raceHorse,
        isUserHorse && styles.raceHorseIsUserHorse,
        isRaceOn && !isHorseFinished && styles.raceHorseRunning
      )}
      ref={horseRef}
    >
      <div
        className={styles[`raceHorseDropShadow${raceHorse.level}`]}
        style={{
          color: raceHorse?.color || "black",
        }}
      >
        🐎
      </div>
      {!isUserHorse && (
        <span title={raceHorse.name} className={styles.raceHorseTitle}>
          {raceHorse.name}
        </span>
      )}
    </div>
  );
};

export default RaceHorse;
