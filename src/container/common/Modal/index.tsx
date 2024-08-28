import styles from './index.module.scss'
import { useRef } from 'react';
import useOutsideClick from '@hooks/useOutsideClick';
import clsx from 'clsx';

const Modal = ({ modalState, closeModal, children }) => {
    const formRef = useRef(null);
    useOutsideClick(formRef, () => {
        if (modalState) {
            closeModal();
        }
    });

    return (
        <div className={clsx(styles.modal, { [styles.open]: modalState })}>
            <div className={styles.modal__overlay} />
            <div className={styles.modal__container} ref={formRef}>
                {children}
            </div>
        </div>
    )
}

export default Modal