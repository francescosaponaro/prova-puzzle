import styles from "./index.module.scss"
import { useState, useRef } from "react"
import useOutsideClick from '@hooks/useOutsideClick';
import ImpostazioniIcon from '@assets/svgs/impostazioni.svg'
import clsx from 'clsx';
import RestartIcon from '@assets/svgs/restart.svg'
import ResetIcon from '@assets/svgs/reset.svg'
import PreviewIcon from '@assets/svgs/anteprima.svg'
import SolveIcon from '@assets/svgs/solve.svg'
import IconButton from "@core/IconButton";

const Settings = ({ shuffle, redraw, solve, toggleImage, hasImage }) => {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);
    useOutsideClick(modalRef, () => {
        if (showModal) {
            setShowModal(false);
        }
    });

    return (
        <div className={styles.settings}>
            <IconButton
                onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(prev => !prev);
                }}
                icon={<ImpostazioniIcon />}
                isRotate={true}
            />
            <div className={clsx(styles.modal, { [styles.open]: showModal })} ref={modalRef}>
                <div onClick={toggleImage}><PreviewIcon /> {hasImage ? "Rimuovi" : "Aggiungi"} immagine</div>
                <div onClick={solve}><SolveIcon /> Risolvi</div>
                <div onClick={redraw}><RestartIcon /> Ricomincia</div>
                <div onClick={shuffle}><ResetIcon /> Riordina</div>
            </div>
        </div>
    )
}

export default Settings