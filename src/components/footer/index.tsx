import { Link } from "react-router-dom";

import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="/about-pomodoro">Entenda a Técnica Pomodoro</Link>
      <p>
        Chronos &copy; {new Date().getFullYear()} — Trabalho de Leonardo Vilella
      </p>
    </footer>
  );
}
