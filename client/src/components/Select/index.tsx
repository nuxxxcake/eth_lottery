import React, { ReactNode, useRef, useState } from 'react';

import { Icon, Input } from '..';
import { useOutsideClick } from '../../utils/hooks';

import styles from './Select.module.scss';

interface SelectProps {
  options: any[];
  onChange: (value: string) => void;
}

export const Select = ({ options = [], onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleChange = (option: any) => {
    onChange && onChange(option.value);
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className={styles.Root}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.Input}>
        <Input readOnly />

        <div className={styles.Arrow}>
          <Icon iconType='angle-down' />
        </div>
      </div>

      {isOpen && (
        <ul ref={dropdownRef} className={styles.Dropdown}>
          {options.map((option: any) => (
            <li onClick={() => handleChange(option.value)} key={option.value}>{option.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};