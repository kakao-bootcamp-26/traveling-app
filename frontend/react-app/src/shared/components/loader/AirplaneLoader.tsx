import React from "react";
import styles from "./AirplaneLoader.module.css";
import { GiCommercialAirplane } from "react-icons/gi";

interface CustomStyle extends React.CSSProperties {
  "--i"?: number;
}

type Props = {
  className?: string;
};

export default function AirplaneLoader({ className }: Props) {
  const customStyles: CustomStyle[] = new Array(20).fill({}).map((_, i) => ({ "--i": i + 1 }));
  return (
    <div className={`${styles.loader} ${className}`}>
      {customStyles.map((style, index) => (
        <span key={index} style={style}></span>
      ))}
      <div className={styles.rocket}>
        <div className={styles.icon}>
          <GiCommercialAirplane />
        </div>
      </div>
    </div>
  );
}
