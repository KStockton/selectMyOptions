import React, { useState } from "react";
import styles from "./select.module.css";

type selectOption = {
  label: string;
  value: any;
};

type SelectProps = {
  options: selectOption[];
  value?: selectOption;
  onChange: (value: selectOption | undefined) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div tabIndex={0} className={styles.container}>
      <span className={styles.value}>{value?.label}</span>
      <button className={styles["clear-btn"]}>&times;</button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option) => (
          <li key={option.label} className={styles.option}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
