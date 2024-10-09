import styles from "./index.module.scss";
import { useState } from "react";
import PrimaryButton from "@core/PrimaryButton";
import clsx from "clsx";

const ProductCard = ({ img, title, onClick, soldOut }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <img
          src={img}
          alt={title}
          className={clsx({ [styles.hover]: isHovered })}
        />
        {soldOut && (
          <div className={styles.card__sold_out}>
            <div className={styles.card__sold_out__text}>sold out</div>
          </div>
        )}
      </div>
      <p className={styles.card__title}>{title}</p>
      <div className={styles.card__cta}>
        <PrimaryButton
          text={soldOut ? "Avvisami quando torna in stock" : "Gioca"}
          onClick={() => {
            if (soldOut) {
              // Opens the default email client with a subject line
              window.location.href =
                "mailto:puzzle@zumbat.it?subject=Prenotazione%20puzzle";
            } else {
              onClick();
            }
          }}
          onEnter={() => setIsHovered(true)}
          onLeave={() => setIsHovered(false)}
        />
      </div>
    </div>
  );
};

export default ProductCard;
