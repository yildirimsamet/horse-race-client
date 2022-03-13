import axios from '../../utils/axios';
import END_POINTS from '../../config/END_POINTS.json'
import HeaderTitle from '../../components/HeaderTitle';
import PixelShopItem from '../../components/PixelShopItem';
import styles from './styles.module.scss'
const PixelShopPage = ({items}) => {
    return (
        <div >
            <HeaderTitle>Pixel Shop</HeaderTitle>
            <div className={styles.pixelShop}>
        {items.map((item) => {
            return <PixelShopItem item={item} key={item.id}/>
        })}
            </div>
        </div>
    )
}
export const getServerSideProps = async () =>{
    console.log("PixelShopPage getServerSideProps");
    const {data} = await axios.get(END_POINTS.pixel_shop.get_items);
    console.log('data',data)
    return {
        props: {
            items:data.items
        }
    }
}
export default PixelShopPage;