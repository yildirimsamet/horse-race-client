import styles from './styles.module.scss';
import {useEffect, useState} from 'react';
import HeaderTitle from '../../HeaderTitle';
import RaceTable from '../../RaceTable';
const WatchRaceBody = ({sRaceResults}) => {
    console.log("sRaceRes",sRaceResults);
    const [cRaceResults, setCRaceResults] = useState(sRaceResults);
    const [isRaceOn ,setIsRaceOn] = useState(false);
    const [timer,setTimer]=useState(3);
    useEffect(()=>{
        const timerInterval = setInterval(()=>{
            if(timer > 1) {
                setTimer(timer=>timer-1);
            } else {
                setIsRaceOn(true);
                clearInterval(timerInterval);
            }
        },1000)
        return ()=>{
            clearInterval(timerInterval);
        }
    },[timer])
    return (
        <div className={styles.watchRace}>
           <HeaderTitle>
               🎉 Race 🎉
           </HeaderTitle>
           {timer}
           {`${isRaceOn}`}
           <RaceTable isRaceOn={isRaceOn} cRaceResults={cRaceResults} />
        </div>
    );
};

export default WatchRaceBody;
