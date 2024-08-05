import classnames from "classnames";
import React, { useState, useRef, useEffect } from "react";

import styles from "./index.module.scss";

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  onEditComplete: (name: string) => void;
  onClick: () => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived = false, onClick, onEditComplete } = props;

  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  const hanldeInputBlur = () => {
    setEditing(false);
    onEditComplete(name)
}


  return (
    <div
      className={classnames(
        styles["tab-item"],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles["tabs-item-input"]}
          value={name}
          onBlur={hanldeInputBlur}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{name}</span>
      )}
    </div>
  );
};
