import {
  HistoryIcon,
  InfoIcon,
  MoonIcon,
  SunIcon,
  TimerIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import style from "./styles.module.css";

type AvailableThemes = "dark" | "light";

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem("theme") as AvailableThemes | null;
    return storageTheme || "dark";
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav className={style.menu}>
      <NavLink
        className={({ isActive }) =>
          `${style.menuLink} ${isActive ? style.active : ""}`
        }
        to="/"
        aria-label="Ir para a Home"
        title="Home — Timer"
      >
        <TimerIcon />
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${style.menuLink} ${isActive ? style.active : ""}`
        }
        to="/history"
        aria-label="Ver histórico de tarefas"
        title="Histórico"
      >
        <HistoryIcon />
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${style.menuLink} ${isActive ? style.active : ""}`
        }
        to="/about-pomodoro"
        aria-label="Sobre a Técnica Pomodoro"
        title="Sobre o Pomodoro"
      >
        <InfoIcon />
      </NavLink>

      <a
        className={style.menuLink}
        href="#"
        onClick={handleThemeChange}
        aria-label="Alternar tema"
        title="Alternar tema claro/escuro"
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
