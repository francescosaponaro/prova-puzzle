import styles from './index.module.scss'
import PrimaryButton from '@core/PrimaryButton'
import CloseButton from '@core/CloseButton'
import { useNavigate } from 'react-router-dom'

const ModalContentPrimary = ({ img, title, closeModal }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.modal_content}>
            <div className={styles.close_btn}><CloseButton callback={closeModal} /></div>
            <div className={styles.img}><img src={img} alt='puzzle' /></div>
            <div className={styles.info}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>Puzzle da 1000 pezzi</p>
                {/* <p className={styles.price}>€23,90</p> */}
            </div>
            <div className={styles.ctas}>
                <PrimaryButton
                    text="Gioca"
                    height={64}
                    borderRadius={34}
                    fontWeight={700}
                    onClick={() => navigate(`/play/sampleid`)}
                />
                <PrimaryButton
                    text="Acquista il puzzle"
                    variety="secondary"
                    height={64}
                    borderRadius={34}
                    fontWeight={700}
                    onClick={() => { }}
                />
            </div>
        </div>
    )
}

export default ModalContentPrimary