import Image from "next/image";
import styles from "./Hobbies.module.scss";
import {
  aroundIcon,
  computerIcon,
  travelerIcon,
  fishingIcon,
  huntingIcon,
} from "@/components/img/aside/hobbies/logoHobbies";

const iconHobbies = {
  around: aroundIcon,
  computer: computerIcon,
  traveler: travelerIcon,
  fishing: fishingIcon,
  hunting: huntingIcon,
};

export default function Hobbies({ hobbies }) {
  return (
    <>
      <div className={styles.localisation}>
        {hobbies.map((item) => {
          let svgName = item.icon;
          const SvgComponent = iconHobbies[svgName];
          return (
            <span key={crypto.randomUUID()} className={styles.icon}>
              <SvgComponent />
            </span>
          );
        })}
      </div>
    </>
  );
}
