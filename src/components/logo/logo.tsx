import { TimerIcon } from "lucide-react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

export function Logo() {
  return (
    <div className={styles.logo}>
      <Link to="/" className={styles.logoLink} title="Chronos — Home">
        <TimerIcon />
        <span>Chronos</span>
      </Link>
    </div>
  );
}
