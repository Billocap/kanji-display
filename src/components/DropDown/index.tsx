import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import styles from "./style.module.css";

interface Props {
  text: string,
  items: {
    write: KanjiListObject[],
    grades: KanjiListObject[]
  },
  onClick: (name: KanjiListObject) => void
}

export default function DropDown({text, items, onClick}: Props) {
  const [extended, setExtended] = useState(false);

  const getClassName = () => {
    const className = extended ? styles.extended : "";

    return [
      styles.content,
      className
    ].join(" ");
  };

  const writeList = items.write.map(
    (item, id) => {
      const config = {
        key: id,
        className: styles.item,
        onClick: () => onClick(item)
      };

      return <button {...config}>{item.label}</button>;
    }
  );

  const gradeList = items.grades.map(
    (item, id) => {
      const config = {
        key: id,
        className: styles.item,
        onClick: () => onClick(item)
      };

      return <button {...config}>{item.label}</button>;
    }
  );
  
  return (
    <div
      className={`${styles.container} group`}
      onMouseOver={_ => setExtended(true)}
      onMouseOut={_ => setExtended(false)}
    >
      <span className="whitespace-nowrap">
        {text}
        <FontAwesomeIcon
          className={`${styles.icon} group-hover:rotate-180`}
          icon={faChevronDown}
        />
      </span>
      <div className={styles.contentWindow}>
        <div className={getClassName()}>
          {writeList}
          <hr className="my-4"/>
          {gradeList}
        </div>
      </div>
    </div>
  );
}