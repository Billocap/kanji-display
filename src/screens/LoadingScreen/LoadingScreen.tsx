import { faYinYang } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from "./loading-screen.module.css"

export default function LoadingScreen() {
  return (
    <div className={styles.container}>
      L<FontAwesomeIcon className={styles.icon} icon={faYinYang}/>ading
    </div>
  )
}
