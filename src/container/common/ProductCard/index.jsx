import styles from './index.module.scss'
import { useState } from 'react'
import PrimaryButton from '@core/PrimaryButton'
import clsx from 'clsx'

const ProductCard = ({ img, title, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={styles.card}>
            <div className={styles.card__img}>
                <img src={img} alt={title} className={clsx({ [styles.hover]: isHovered })} />
            </div>
            <p className={styles.card__title}>{title}</p>
            <div className={styles.card__cta}>
                <PrimaryButton
                    text="Gioca"
                    onClick={onClick}
                    onEnter={() => setIsHovered(true)}
                    onLeave={() => setIsHovered(false)}
                />
            </div>
        </div>
    )
}

export default ProductCard