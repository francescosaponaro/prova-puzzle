import styles from './index.module.scss';
import Close from '@assets/svgs/close.svg';

const CloseButton = ({ callback }) => {
    return (
        <div className={styles.close_button} onClick={callback}><Close /></div>
    )
}

export default CloseButton