import axios from "../../utils/axios";
import END_POINTS from "../../config/END_POINTS.json";
import HeaderTitle from "../../components/HeaderTitle";
import PixelShopItem from "../../components/PixelShopItem";
import styles from "./styles.module.scss";
import getConfigForServer from "../../utils/getConfigForServer";
const PixelShopPage = ({ items }) => {
  return (
    <div>
      <HeaderTitle>Pixel Shop</HeaderTitle>
      <div className={styles.pixelShop}>
        {items.map((item) => {
          return <PixelShopItem item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  try {
    const config = await getConfigForServer(req, res);
    if (!config.headers.Authorization) {
      throw new Error("No authorization header");
    }
    const { data } = await axios.get(END_POINTS.pixel_shop.get_items);

    return {
      props: {
        items: data.items,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
};
export default PixelShopPage;
