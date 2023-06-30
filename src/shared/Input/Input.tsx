import React, { ReactNode } from 'react';
import styles from './Input.module.scss';

type Props = {
  children?: ReactNode,
  id: string,
  type: string,
  value: string,
  name: string
  label?: string,
  className?: string
  placeholder?: string
  onChange: (value: any) => void,
};

export const Input: React.FC<Props> = ({
  children,
  id,
  type,
  value,
  name,
  label,
  className,
  placeholder,
  onChange,
}) => {
  return (
    <div className={styles.item}>
      <label htmlFor={id}>{label}
        {children}
        <input
          type={type}
          name={name}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        >
        </input>
      </label>
    </div>
  );
};
