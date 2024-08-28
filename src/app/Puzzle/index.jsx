import { Canvas, painters, outline, generators } from 'headbreaker';
import { useState } from 'react'
import { useEffect, useRef } from 'react';
import PuzzleImage from '@assets/images/5a3a2e96273f0fc812fd59202a5f6eb6.png'
import styles from './index.module.scss'
import Modal from "@common/Modal"
import SuccessModal from './containers/SuccessModal';
import Settings from './containers/Settings';

const DemoPuzzle = () => {
    const puzzleRef = useRef(null)
    const containerRef = useRef(null)
    const [showModal, setShowModal] = useState(false);
    const [canvas, setCanvas] = useState(null);
    const [additionalHeight, setAdditionalHeight] = useState(0);

    useEffect(() => {
        if (containerRef.current && containerRef.current.clientHeight - containerRef.current.clientWidth < 400) {
            setAdditionalHeight(containerRef.current.clientHeight < 575 ? 200 : 150);
        }
    }, [containerRef])

    const shufflePuzzle = () => {
        canvas.shuffleGrid();
        canvas.puzzle.pieces.forEach(piece => {
            const translateY = (containerRef.current.clientHeight * 0.5) / (containerRef.current.offsetWidth / 500);
            piece.translate(0, translateY);
        });
        canvas.redraw();
    }

    const initializePuzzle = () => {
        if (!puzzleRef.current || !containerRef.current) return;

        let puzzleImg = new Image();
        puzzleImg.src = PuzzleImage;

        puzzleImg.onload = () => {
            const puzzle = puzzleRef.current;
            const scale = containerRef.current.offsetWidth / 500;

            const newCanvas = new Canvas(puzzle.id, {
                width: containerRef.current.clientWidth - 40,
                height: containerRef.current.clientHeight + additionalHeight - 24,
                pieceSize: 67,
                proximity: 4,
                strokeWidth: 2,
                strokeColor: '#F0F0F0',
                outline: new outline.Rounded(),
                painter: new painters.Konva(),
                image: puzzleImg,
                fixed: true,
                preventOffstageDrag: true,
            });

            newCanvas.adjustImagesToPuzzleWidth();
            newCanvas.scale(scale);
            newCanvas.autogenerate({ insertsGenerator: generators.random });
            newCanvas.shuffleGrid();
            newCanvas.registerKeyboardGestures();
            newCanvas.puzzle.pieces.forEach(piece => {
                const translateY = (containerRef.current.clientHeight * 0.5) / scale;
                piece.translate(0, translateY);
            });
            newCanvas.draw();
            newCanvas.attachSolvedValidator();
            newCanvas.onValid(() => setShowModal(true));

            setCanvas(newCanvas);
        };
    };

    useEffect(() => {
        initializePuzzle();
    }, [puzzleRef, containerRef, additionalHeight]);

    useEffect(() => {
        const resizePuzzle = () => {
            if (canvas == null) return;
            if (containerRef.current.clientHeight - containerRef.current.clientWidth < 400) {
                setAdditionalHeight(containerRef.current.clientHeight < 575 ? 200 : 150);
            } else {
                setAdditionalHeight(0);
            }
            canvas.resize(containerRef.current.clientWidth - 40, containerRef.current.clientHeight - 24);
            canvas.scale(containerRef.current.offsetWidth / 500);
            canvas.redraw();
        }
        window.addEventListener('resize', () => resizePuzzle());

        return () => {
            window.removeEventListener('resize', () => resizePuzzle());
        }
    }, [containerRef, canvas])

    return (
        <div className={styles.page}>
            <div className={styles.container} ref={containerRef}>
                <div className={styles.fake_canvas}><img src={PuzzleImage} /></div>
                <div className={styles.additional_height} style={{ height: additionalHeight }} />
                <div className={styles.puzzle} ref={puzzleRef} id="puzzle"></div>
                <Settings
                    shuffleCallback={() => shufflePuzzle()}
                    redrawCallback={() => initializePuzzle()}
                />
                <Modal
                    modalState={showModal}
                    closeModal={() => setShowModal(false)}
                    children={<SuccessModal closeModal={() => setShowModal(false)} />}
                />
            </div>
        </div>
    )
}

export default DemoPuzzle;