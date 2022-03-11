import Link from 'next/link';
import styles from './styles.module.scss';
const Navigations = () => {
    return (
        <div className={styles.navigations}>
            <Link href='my-barn'>
                <a>My Barn</a>
            </Link>
            <Link href='race'>
                <a>Races</a>
            </Link>
            <Link href='horse-shop'>
                <a>Horse Shop</a>
            </Link>
            <Link href='pixel-shop'>
                <a>Pixel Shop</a>
            </Link>
        </div>
    )
}
export default Navigations;