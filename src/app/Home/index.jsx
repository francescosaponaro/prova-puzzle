import styles from './index.module.scss'
import { useState } from 'react'
import ProductCard from "@common/ProductCard"
import Modal from "@common/Modal"
import ModalContentPrimary from '@common/ModalContentPrimary'
import FirstImg from '@assets/images/5a3a2e96273f0fc812fd59202a5f6eb6.png'
import SecondImg from '@assets/images/67c2db0c4d5725635f3b777fefd9a713.png'
import ThirdImg from '@assets/images/122ad2917e51491b64e787dfab33264b.png'
import FourthImg from '@assets/images/364b6ef9b66ae220f54b3b11d0de2e61.png'
import FifthImg from '@assets/images/726ec7540660a8a9e3331bd2416a69d4.png'
import SixthImg from '@assets/images/98811faf6e9052957dad4888e9003924.png'
import SeventhImg from '@assets/images/5a3a2e96273f0fc812fd59202a5f6eb6.png'
import EighthImg from '@assets/images/67c2db0c4d5725635f3b777fefd9a713.png'

const PuzzleList = [
    {
        img: FirstImg,
        title: 'Voglio Ballare',
    },
    {
        img: SecondImg,
        title: 'Spring Snack',
    },
    {
        img: ThirdImg,
        title: 'Pelosetti Baffuti',
    },
    {
        img: FourthImg,
        title: 'Click it Scroll it',
    },
    {
        img: FifthImg,
        title: 'Puzzle 1',
    },
    {
        img: SixthImg,
        title: 'Puzzle 2',
    },
    {
        img: SeventhImg,
        title: 'Puzzle 3',
    },
    {
        img: EighthImg,
        title: 'Puzzle 4',
    },
]

const Home = () => {
    const [modalContent, setModalContent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = (img, title) => {
        setModalContent({ img, title });
        setShowModal(true);
    }

    return (
        <section className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>ProvaPuzzle</h1>
                    <p>Scegli il tuo puzzle preferito e prova a completarlo per ottenere un super sconto per l’acquisto </p>
                </div>
                <div className={styles.puzzle_list}>
                    {PuzzleList.map((puzzle, index) => (
                        <ProductCard
                            key={index}
                            img={puzzle.img}
                            title={puzzle.title}
                            onClick={() => openModal(puzzle.img, puzzle.title)}
                        />
                    ))}
                </div>
            </div>
            <Modal
                modalState={showModal}
                closeModal={() => setShowModal(false)}
                children={
                    <ModalContentPrimary
                        img={modalContent?.img}
                        title={modalContent?.title}
                        closeModal={() => setShowModal(false)}
                    />
                }
            />
        </section>
    )
}

export default Home