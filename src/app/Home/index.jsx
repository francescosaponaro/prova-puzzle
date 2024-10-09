import styles from "./index.module.scss";
import { useState } from "react";
import ProductCard from "@common/ProductCard";
import Modal from "@common/Modal";
import ModalContentPrimary from "@common/ModalContentPrimary";
import PuzzleList from "../../routes/constants/PUZZLE";

const Home = () => {
  const [modalContent, setModalContent] = useState({
    img: "",
    title: "",
    description: "",
    link: "",
    id: "",
    orientation: "",
  });
  const [showModal, setShowModal] = useState(false);

  const openModal = (img, title, description, link, id, orientation) => {
    setModalContent({ img, title, description, link, id, orientation });
    setShowModal(true);
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Componi Stopuzzle Online</h1>
          <p>
            Scopri il puzzle online di Stopuzzle: una sfida coinvolgente e
            rilassante, pensata per ogni appassionato. Ogni pezzo si incastra
            perfettamente, rivelando un’immagine unica creata dai migliori
            illustratori. Divertiti a completarlo ovunque tu sia e scopri le
            sorprese che abbiamo in serbo per te.
          </p>
        </div>
        <div className={styles.puzzle_list}>
          {PuzzleList.map((puzzle, index) => (
            <ProductCard
              key={index}
              img={puzzle.img}
              title={puzzle.title}
              onClick={() =>
                openModal(
                  puzzle.img,
                  puzzle.title,
                  puzzle.description,
                  puzzle.link,
                  puzzle.id,
                  puzzle.orientation
                )
              }
            />
          ))}
        </div>
      </div>
      <Modal
        modalState={showModal}
        closeModal={() => setShowModal(false)}
        children={
          <ModalContentPrimary
            img={modalContent.img}
            title={modalContent.title}
            description={modalContent.description}
            link={modalContent?.link}
            id={modalContent.id}
            orientation={modalContent.orientation}
            closeModal={() => setShowModal(false)}
          />
        }
      />
    </section>
  );
};

export default Home;
