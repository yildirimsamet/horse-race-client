import { useEffect, useState } from "react";

const windowTypes = {
  mobile: "mobile",
  tablet: "tablet",
  desktop: "desktop",
};
const useWindowType = () => {
  const [windowType, setWindowType] = useState(windowTypes.desktop);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 450) {
        setWindowType(windowTypes.mobile);
      } else if (window.innerWidth > 450 && window.innerWidth <= 800) {
        setWindowType(windowTypes.tablet);
      } else {
        setWindowType(windowTypes.desktop);
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowType;
};

export default useWindowType;