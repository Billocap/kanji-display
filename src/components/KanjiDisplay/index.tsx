import styles from "./style.module.css";

interface Props {
  kanji: any
}

export default function KanjiDisplay({kanji}: Props) {
  const WordList = ({list}: any) => {
    return (
      <ul>
        {
          list.map((item: any, id: number) => {
            return <li key={id}>{item}</li>;
          })
        }
      </ul>
    );
  };

  const ButtonList = ({list}: any) => {
    return (
      <ul>
        {
          list.map((item: any, id: number) => {
            return (
              <li key={id}>
                <button>
                  {item}
                </button>
              </li>
            );
          })
        }
      </ul>
    );
  };

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.character}>
          <h2>{kanji.kanji}</h2>
          <span>{kanji.unicode.toUpperCase()}</span>
        </div>
        <div className={styles.information}>
          <h2>
            {(kanji.heisig_en || kanji.meanings[0]).toUpperCase()}
            <div className={styles['tool-tip']}>
              {(kanji.heisig_en || kanji.meanings[0]).toUpperCase()}
            </div>
          </h2>
          <div>
            <span>STROKE COUNT {kanji.stroke_count}</span>
            <span>GRADE {kanji.grade || "-/-"}</span>
            <span>JLPT {kanji.jlpt || "-/-"}</span>
          </div>
        </div>
      </header>
      <div className={styles.grammar}>
        <div>
          <p>Meanings</p>
          <WordList list={kanji.meanings}/>
        </div>
        <div>
          <p>Onyomis</p>
          <ButtonList list={kanji.on_readings}/>
        </div>
        <div>
          <p>Names</p>
          <ButtonList list={kanji.name_readings}/>
        </div>
        <div>
          <p>Kunyomis</p>
          <ButtonList list={kanji.kun_readings}/>
        </div>
      </div>
      {/* <div className={styles.words}>
        <p>Words</p>
      </div> */}
    </div>
  );
}