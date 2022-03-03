import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";

import styles from "./style.module.css";

interface Props {
  text: string,
  items: {
    write: KanjiListObject[],
    grades: KanjiListObject[]
  },
  onClick: (name: KanjiListObject) => void
}

function DropDownItems({items, onClick}: any) {
  return (
    <Fragment>
      {
        items.map(
          (item: KanjiListObject, id: number) => {
            const config = {
              key: id,
              className: styles.item,
              onClick: () => onClick(item)
            };

            return <button {...config}>{item.label}</button>;
          }
        )
      }
    </Fragment>
  );
};

export default function DropDown({text, items, onClick}: Props) {
  const [extended, setExtended] = useState(false);

  const getClassName = () => {
    const className = extended ? styles.extended : "";

    return [
      styles.content,
      className
    ].join(" ");
  };

  const getHover = () => {
    return navigator.maxTouchPoints == 0 ?
      {
        onMouseOver() {
          setExtended(true);
        },
        onMouseOut() {
          setExtended(false);
        }
      } :
      {};
  };

  const handleItemClick = (item: KanjiListObject) => {
    setExtended(false);

    onClick(item);
  };
  
  return (
    <div
      className={styles.container}
      {...getHover()}
    >
      <span
        className="whitespace-nowrap"
        onTouchEnd={() => setExtended(!extended)}
      >
        <span className="pointer-events-none">
          {text}
        </span>
        <FontAwesomeIcon
          style={{
            transform: `rotate(${extended ? 180 : 0}deg)`
          }}
          className={styles.icon}
          icon={faChevronDown}
        />
      </span>
      <div className={styles.contentWindow}>
        <div className={getClassName()}>
          <DropDownItems
            items={items.write}
            onClick={handleItemClick}
          />
          <hr className="my-4"/>
          <DropDownItems
            items={items.grades}
            onClick={handleItemClick}
          />
        </div>
      </div>
    </div>
  );
}