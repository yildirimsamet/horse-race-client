import RaceListItem from './RacerListItem';
import styles from './styles.module.scss';

const RaceCardRacerList = ({users, race}) => {

    return (
        <div className={styles.wrapper}>
            {users.map((user) => {
                return <RaceListItem race={race} key={user.id} user={user} />
            })}
        </div>
    );
};

export default RaceCardRacerList;
