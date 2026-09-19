import { useTaskContext } from "../../contexts/taskContext/useTaskContext";

import styles from "./styles.module.css";

export function CountDown() {
  const taskContext = useTaskContext();

  return (
    <div className={styles.container}>
      <span>{taskContext.state.formattedSecondsRemaining}</span>
    </div>
  );
}