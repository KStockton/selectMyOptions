import React, { useState, useEffect } from "react";
import styles from "./select.module.css";

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(1);
    }
  }, [value]);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) {
        onChange(option);
      }
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option ===  value;
  }

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((previousState) => !previousState)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple ? 
      value.map(v => (
        <button 
        key={v.value} 
        className={styles["option-badge"]}
        onClick={e => {
          e.stopPropagation();
          selectOption(v);
        }}>{v.label}
        <span className={styles['remove-btn']}>&times;</span></button>
      )) : value?.label
      }</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            }
            ${index === highlightedIndex ? styles.highlighted : ""}
            `}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
