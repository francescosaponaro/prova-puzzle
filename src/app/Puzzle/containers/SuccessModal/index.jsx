import styles from './index.module.scss'
import PrimaryButton from '@core/PrimaryButton'
import CloseButton from '@core/CloseButton'
import LolloImg from '@assets/images/lollo.png'
import OkImg from '@assets/svgs/ok.svg'
import PieceImg from '@assets/svgs/puzzle-piece.svg'

const SuccessModal = ({ closeModal }) => {
    return (
        <div className={styles.modal_content}>
            <div className={styles.close_btn}><CloseButton callback={closeModal} /></div>
            <div className={styles.img}>
                <img src={LolloImg} alt='puzzle' className={styles.img__lollo} />
                <OkImg className={styles.img__ok} />
                <PieceImg className={styles.img__piece} />
            </div>
            <div className={styles.info}>
                <h2 className={styles.title}>Complimenti</h2>
                <p className={styles.description}>
                    Se ti va puoi acquistare la versione fisica sul nostro sito e cliccando qui sotto attiverai il codice sconto che troverai
                    al checkout
                </p>
            </div>
            <div className={styles.ctas}>
                <PrimaryButton
                    text="Vai al Puzzle!"
                    height={64}
                    borderRadius={34}
                    fontWeight={700}
                    onClick={() => { }}
                />
            </div>
        </div>
    )
}

export default SuccessModal