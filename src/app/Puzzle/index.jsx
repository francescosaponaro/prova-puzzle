import { Canvas, painters, outline, generators } from 'headbreaker';
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import PuzzleImage from '@assets/images/5a3a2e96273f0fc812fd59202a5f6eb6.png'
import AudioFile from '@assets/audio/1232242279687651369.ogg'
import AudioFileComplete from '@assets/audio/audio.mp3'
import styles from './index.module.scss'
import Modal from "@common/Modal"
import SuccessModal from './containers/SuccessModal';
import Settings from './containers/Settings';
import IconButton from '@core/IconButton';
import ROUTES from '@routes/constants';
import HomeIcon from '@assets/svgs/home.svg'
import clsx from 'clsx';
import ORIENTATION_SETTINGS from './constants/ORIENTATION_SETTINGS';

const DemoPuzzle = ({ isLandscape = true }) => {
    const puzzleRef = useRef(null)
    const containerRef = useRef(null)
    const boardRef = useRef(null)
    const [showModal, setShowModal] = useState(false);
    const [canvas, setCanvas] = useState(null);
    console.log(canvas, 'canvas');
    const [additionalHeight, setAdditionalHeight] = useState(0);
    console.log(additionalHeight, 'additionalHeight');
    const [orientation, setOrientation] = useState(isLandscape ? 'LANDSCAPE' : 'PORTRAIT');
    console.log(orientation, 'orientation');
    const [hasImage, setHasImage] = useState(true);
    const navigate = useNavigate();
    let audio = new Audio(AudioFile);
    let audioComplete = new Audio(AudioFileComplete);

    const solvePuzzle = () => {
        canvas.solve();
        canvas.redraw();
        audioComplete.play();
        setTimeout(() => setShowModal(true), 500)
    }

    const shufflePuzzle = () => {
        canvas.shuffleGrid();
        canvas.puzzle.pieces.forEach(piece => {
            const translateY = (containerRef.current.clientHeight * 0.5) / (containerRef.current.offsetWidth / ORIENTATION_SETTINGS[orientation].scale);
            piece.translate(ORIENTATION_SETTINGS[orientation].translateX, translateY);
        });
        canvas.redraw();
    }

    const additionalHeightHandler = () => {
        if (!containerRef?.current || !boardRef?.current || !canvas) return;

        const containerHeight = containerRef.current.clientHeight;
        const puzzleContentHeight = canvas.pieceSize.diameter.y * canvas.maxPiecesCount.y * 2;
        const boardHeight = boardRef.current.clientHeight;
        const difference = (puzzleContentHeight + boardHeight) - containerHeight;
        console.log(boardHeight, "boardHeight")
        console.log(puzzleContentHeight, "puzzleContentHeight")
        console.log(containerHeight, "containerHeight")
        console.log(difference, "difference")
        if (containerHeight < puzzleContentHeight) {
            setAdditionalHeight(difference);
        }
    }

    const orientationSetter = () => {
        if (!containerRef.current) return;

        if (isLandscape) {
            if (containerRef.current.clientWidth >= 500) {
                setOrientation("LANDSCAPE");
            } else {
                setOrientation("PORTRAIT");
            }
        }
    }

    const resizePuzzle = () => {
        if (canvas == null) return;

        additionalHeightHandler();
        orientationSetter();

        canvas.resize(containerRef.current.clientWidth - 40, containerRef.current.clientHeight + additionalHeight - 24);
        canvas.scale(containerRef.current.offsetWidth / ORIENTATION_SETTINGS[orientation].scale);
        canvas.redraw();
    }

    const initializePuzzle = () => {
        if (!puzzleRef.current || !containerRef.current) return;

        let puzzleImg = new Image();
        puzzleImg.src = PuzzleImage;

        puzzleImg.onload = () => {
            const puzzle = puzzleRef.current;
            const scale = containerRef.current.offsetWidth / ORIENTATION_SETTINGS[orientation].scale;

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
                piece.translate(ORIENTATION_SETTINGS[orientation].translateX, translateY);
            });

            newCanvas.draw();

            newCanvas.onConnect(() => audio.play())
            newCanvas.onDisconnect(() => audio.play())

            newCanvas.attachSolvedValidator();
            newCanvas.onValid(() => {
                audioComplete.play();
                setTimeout(() => setShowModal(true), 500)
            });

            setCanvas(newCanvas);
        };
    };

    useEffect(() => {
        initializePuzzle();
    }, [puzzleRef, containerRef, additionalHeight]);

    useEffect(() => {
        additionalHeightHandler();
    }, [containerRef, boardRef, canvas])

    useEffect(() => {
        orientationSetter();
    }, [isLandscape, containerRef])

    // useEffect(() => {
    //     if (!canvas) return;
    //     // canvas.scale(containerRef.current.offsetWidth / ORIENTATION_SETTINGS[orientation].scale);
    //     console.log(ORIENTATION_SETTINGS[orientation].scale, 'ORIENTATION_SETTINGS[orientation].scale');
    //     console.log(ORIENTATION_SETTINGS[orientation].translateX, 'ORIENTATION_SETTINGS[orientation].translateX');
    //     canvas.puzzle.pieces.forEach(piece => {
    //         const translateY = (containerRef.current.clientHeight * 0.5) / (containerRef.current.offsetWidth / ORIENTATION_SETTINGS[orientation].scale);
    //         piece.translate(ORIENTATION_SETTINGS[orientation].translateX, translateY);
    //     });
    //     canvas.redraw();
    // }, [orientation, containerRef])

    useEffect(() => {
        window.addEventListener('resize', () => resizePuzzle());

        return () => {
            window.removeEventListener('resize', () => resizePuzzle());
        }
    }, [containerRef, canvas, orientation])

    return (
        <div className={styles.page}>
            <div className={styles.container}
                ref={containerRef}
                style={{ maxWidth: ORIENTATION_SETTINGS[orientation].maxWidth, height: `calc(100% + ${additionalHeight})` }}
            >
                <div
                    ref={boardRef}
                    className={styles.fake_canvas}
                    style={{ maxHeight: ORIENTATION_SETTINGS[orientation].maxHeightCanvas }}
                >
                    {<img src={PuzzleImage} className={clsx({ [styles.hide]: !hasImage })} />}
                </div>
                <div className={styles.puzzle} ref={puzzleRef} id="puzzle"></div>
                <Settings
                    hasImage={hasImage}
                    toggleImage={() => setHasImage(prev => !prev)}
                    solve={() => solvePuzzle()}
                    shuffle={() => shufflePuzzle()}
                    redraw={() => initializePuzzle()}
                />
                <Modal
                    modalState={showModal}
                    closeModal={() => setShowModal(false)}
                    children={<SuccessModal closeModal={() => setShowModal(false)} />}
                />
                <div className={styles.back_btn}>
                    <IconButton
                        onClick={() => navigate(ROUTES.HOME)}
                        icon={<HomeIcon />}
                    />
                </div>
            </div>
        </div>
    )
}

export default DemoPuzzle;