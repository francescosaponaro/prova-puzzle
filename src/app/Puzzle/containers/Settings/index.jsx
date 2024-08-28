import styles from "./index.module.scss"
import { useState, useRef } from "react"
import useOutsideClick from '@hooks/useOutsideClick';
import ImpostazioniIcon from '@assets/svgs/impostazioni.svg'
import clsx from 'clsx';
import RestartIcon from '@assets/svgs/restart.svg'
import ResetIcon from '@assets/svgs/reset.svg'

const Settings = ({ shuffleCallback, redrawCallback }) => {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);
    useOutsideClick(modalRef, () => {
        if (showModal) {
            setShowModal(false);
        }
    });

    return (
        <div className={styles.settings}>
            <div className={styles.button}
                onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(prev => !prev);
                }}>
                <ImpostazioniIcon />
            </div>
            <div className={clsx(styles.modal, { [styles.open]: showModal })} ref={modalRef}>
                <div onClick={shuffleCallback}><ResetIcon /> Riordina</div>
                <div onClick={redrawCallback}><RestartIcon /> Ricomincia</div>
            </div>
        </div>
    )
}

export default Settings