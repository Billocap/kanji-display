import styles from "./style.module.css";

interface Props {
  kanji: any,
  onClick: any
}

export default function KanjiDisplay({kanji, onClick}: Props) {
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
                <button onClick={() => onClick(item)}>
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
          <h2>{kanji.data.kanji}</h2>
          <span>{kanji.data.unicode.toUpperCase()}</span>
        </div>
        <div className={styles.information}>
          <h2>
            {(kanji.data.heisig_en || kanji.data.meanings[0]).toUpperCase()}
            <div className={styles['tool-tip']}>
              {(kanji.data.heisig_en || kanji.data.meanings[0]).toUpperCase()}
            </div>
          </h2>
          <div>
            <span>STROKE COUNT {kanji.data.stroke_count}</span>
            <span>GRADE {kanji.data.grade || "-/-"}</span>
            <span>JLPT {kanji.data.jlpt || "-/-"}</span>
          </div>
        </div>
      </header>
      <div className={styles.grammar}>
        <div>
          <p>Meanings</p>
          <WordList list={kanji.data.meanings}/>
        </div>
        <div>
          <p>Names</p>
          <ButtonList list={kanji.data.name_readings}/>
        </div>
        <div>
          <p>Onyomis</p>
          <ButtonList list={kanji.data.on_readings}/>
        </div>
        <div>
          <p>Kunyomis</p>
          <ButtonList list={kanji.data.kun_readings}/>
        </div>
      </div>
      <div className={styles.words}>
        <p>Words</p>
        {kanji.words.map((word: any, id: number) => {
          return (
            <div key={id} className="mb-4">
              {
                word.variants.map((variant: any, id: number) => {
                  return (
                    <span key={id} className="inline-block mr-2">
                      <span className="text-red-500 text-xs block">
                        {variant.pronounced}
                      </span>
                      <span className="text-xl block">
                        {variant.written}
                      </span>
                      {variant.priorities.map((priority: any, id: number) => {
                        return (
                          <span key={id} className="text-red-500 text-xs mr-2">
                            {priority}
                          </span>
                        );
                      })}
                    </span>
                  );
                })
              }
              {
                word.meanings.map((meaning: any, id: number) => {
                  return (
                    <div key={id}>
                      {meaning.glosses.map((gloss: any, id: number) => {
                        return (
                          <span key={id} className="mr-2 text-sm">
                            {gloss}
                          </span>
                        );
                      })}
                    </div>
                  );
                })
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}