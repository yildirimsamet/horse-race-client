import styles from './styles.module.scss';
import cn from 'classnames';

const HorseCardTitle = ({title, level}) => {
  return (
    <h4 className={cn(styles.horseTitle, styles[`horseTitle${level}`])}>
      {title}
    </h4>
  );
};
export default HorseCardTitle;
