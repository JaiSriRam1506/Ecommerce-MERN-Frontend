import ReactDom from 'react-dom'
import styles from './Loader.module.scss'
import loader from '../../assets/loader.gif'

const Loader = () => {
  return ReactDom.createPortal(
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={loader} alt="Loading..."></img>
        </div>
    </div>,document.getElementById("loader")
  )
}

export const Spinner = () => {
    return(
          <div className="--center-all">
              <img src={loader} alt="loading"></img>
          </div>
    )
  }

export default Loader;