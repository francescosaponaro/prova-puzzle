import styles from "./index.module.scss";
import PrimaryButton from "@core/PrimaryButton";
import CloseButton from "@core/CloseButton";
import { useNavigate } from "react-router-dom";

const ModalContentPrimary = ({
  img,
  title,
  description,
  link,
  id,
  orientation,
  closeModal,
}) => {
  const navigate = useNavigate();
  console.log(link);

  return (
    <div className={styles.modal_content}>
      <div className={styles.close_btn}>
        <CloseButton callback={closeModal} />
      </div>
      <div className={styles.img}>
        <img src={img} alt="puzzle" />
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.ctas}>
        <PrimaryButton
          text="Gioca"
          height={64}
          borderRadius={34}
          fontWeight={700}
          onClick={() => navigate(`/play/${id}/${orientation}`)}
        />
        {link ? (
          //   <PrimaryButton
          //     text="Acquista il puzzle"
          //     variety="secondary"
          //     height={64}
          //     borderRadius={34}
          //     fontWeight={700}
          //     onClick={() => {}}
          //   />
          <a href={link} className={styles.ctas__link}>
            Acquista il puzzle
          </a>
        ) : //   <a href={link} className={styles.ctas__link}>Acquista il puzzle</a>
        null}
      </div>
    </div>
  );
};

export default ModalContentPrimary;
