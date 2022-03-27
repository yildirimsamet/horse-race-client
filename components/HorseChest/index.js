import styles from "./styles.module.scss";

const HorseChest = ({ level, onClick, price }) => {
  const chestColors = {
    1: "#999393",
    2: "#367be3",
    3: "#e359e1",
    default: "#999393",
  };
  return (
    <div onClick={onClick || null}>
      <div
        className={styles.chest}
        style={{
          borderColor: chestColors[level] || chestColors["default"],
          background: `linear-gradient( var(--blackLight) 0%, var(--blackLight) 30%, ${
            chestColors[level] || chestColors["default"]
          } 30%, ${
            chestColors[level] || chestColors["default"]
          } 40%, var(--blackLight) 40%, var(--blackLight) 100%)`,
        }}
      >
        <div
          className={styles.chest_keyholeBG}
          style={{
            background: chestColors[level] || chestColors["default"],
          }}
        >
          <div className={styles.chest_keyhole}></div>
        </div>
      </div>
      <h5 className={styles.level}>Level: {level} {`( ${price} )`}</h5>
    </div>
  );
};
export default HorseChest;
