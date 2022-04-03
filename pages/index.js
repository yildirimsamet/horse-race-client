import styles from "./styles.module.scss";
import cn from 'classnames';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.homeHeader}>
        <img src="/assets/welcome.svg" />
      </div>
      <div className={styles.homeBody}>
        <div className={styles.homeBodyItem}>
          <span className={cn(styles.homeBodyItemBadge,styles.homeBodyItemBadgeLeft)}>1</span>
          <div> Create your account </div>{" "}
          <div>
            <img src="/assets/register.svg" />{" "}
          </div>
        </div>
        <div className={styles.homeBodyItem}>
        <span className={cn(styles.homeBodyItemBadge,styles.homeBodyItemBadgeRight)}>2</span>
          <div>
            <img src="/assets/unicorn.svg" />{" "}
          </div>
          <div> Get your first horse </div>{" "}
        </div>
        <div className={styles.homeBodyItem}>
        <span className={cn(styles.homeBodyItemBadge,styles.homeBodyItemBadgeLeft)}>3</span>
          <div> Join races </div>{" "}
          <div>
            <img src="/assets/race.svg" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
