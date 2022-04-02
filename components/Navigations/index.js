import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import cn from "classnames";
import useWindowType from "../../hooks/useWindowType";

const Navigations = ({ setIsMenuOpen }) => {
  const routes = [
    { route: "/my-barn", name: "My Barn" },
    { route: "/races", name: "Races" },
    { route: "/horse-shop", name: "Horse Shop" },
    { route: "/get-horse", name: "Get Horse" },
    { route: "/pixel-shop", name: "Pixel Shop" },
  ];
  const router = useRouter();
  const windowType = useWindowType();
  return (
    <div className={styles.navigations}>
      {routes.map((route, index) => {
        return (
          <Link key={index} href={route.route}>
            <a
              onClick={() => {
                if (windowType !== "desktop") {
                  setIsMenuOpen(false);
                }
              }}
              className={cn(
                styles.navigationsLink,
                router.pathname.includes(route.route) &&
                  styles.navigationsLinkActive
              )}
            >
              {route.name}
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default Navigations;
