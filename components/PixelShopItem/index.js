import styles from "./styles.module.scss";
const PixelShopItem = ({ item }) => {
  return (
    <div className={styles.pixelItem}>
      <img
        className={styles.pixelItemImg}
        src={"/assets/" + item.image}
        alt={item.name}
      />
      <p className={styles.pixelItemProperty}>
        {" "}
        <strong>Name: </strong> {item.name}
      </p>
      <p className={styles.pixelItemProperty}>
        {" "}
        <strong>Price: </strong> {item.price}
      </p>
      <p className={styles.pixelItemProperty}>
        {" "}
        <strong>Energy: </strong> {item.energy}
      </p>
    </div>
  );
};
export default PixelShopItem;
