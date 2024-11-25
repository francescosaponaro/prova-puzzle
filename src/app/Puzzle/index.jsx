import { Canvas, painters, outline, generators } from "headbreaker";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AudioFile from "@assets/audio/connect.mp3";
import AudioFileComplete from "@assets/audio/1232242279687651369.ogg";
import styles from "./index.module.scss";
import Modal from "@common/Modal";
import SuccessModal from "./containers/SuccessModal";
import Settings from "./containers/Settings";
import IconButton from "@core/IconButton";
import ROUTES from "@routes/constants";
import HomeIcon from "@assets/svgs/home.svg";
import clsx from "clsx";
import PuzzleList from "../../routes/constants/PUZZLE";

const DemoPuzzle = () => {
  const puzzleRef = useRef(null);
  const containerRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [additionalHeight, setAdditionalHeight] = useState(0);
  const [hasImage, setHasImage] = useState(true);
  const navigate = useNavigate();
  let audio = new Audio(AudioFile);
  let audioComplete = new Audio(AudioFileComplete);
  const { id, puzzle_orientation } = useParams();
  const puzzle = PuzzleList.find((puzzle) => puzzle.id === id);

  const solvePuzzle = () => {
    canvas.solve();
    canvas.puzzle.pieces.forEach((piece) => {
      piece.translate(containerRef.current.clientWidth * 0.018, -28);
    });
    canvas.redraw();
    audioComplete.play();
    setTimeout(() => setShowModal(true), 500);
  };

  const additionalHeightHandler = () => {
    if (!containerRef?.current || !canvas) return;

    const { clientHeight, clientWidth } = containerRef.current;

    if (clientWidth * 2 < clientHeight) {
      setAdditionalHeight(0);
    } else if (clientHeight - clientWidth > 325) {
      // console.log(clientHeight - clientWidth, '> 325');
      setAdditionalHeight(75);
    } else if (clientHeight - clientWidth > 260) {
      // console.log(clientHeight - clientWidth, '> 260');
      setAdditionalHeight(150);
    } else if (clientHeight - clientWidth > 200) {
      // console.log(clientHeight - clientWidth, '> 200');
      setAdditionalHeight(200);
    } else {
      setAdditionalHeight(200);
    }
  };

  const resizePuzzle = () => {
    if (!canvas) return;

    additionalHeightHandler();

    const { clientWidth, clientHeight } = containerRef.current;
    canvas.resize(clientWidth - 40, clientHeight + additionalHeight - 24);
    canvas.scale(clientWidth / 500);
    canvas.redraw();
  };

  const initializePuzzle = () => {
    if (!puzzleRef.current || !containerRef.current) return;

    let puzzleImg = new Image();
    puzzleImg.src = puzzle.img;

    puzzleImg.onload = () => {
      const puzzle = puzzleRef.current;
      const scale = containerRef.current.offsetWidth / 500;

      const newCanvas = new Canvas(puzzle.id, {
        width: containerRef.current.clientWidth - 40,
        height: containerRef.current.clientHeight + additionalHeight - 24,
        pieceSize: 73,
        proximity: 4,
        strokeWidth: 2,
        strokeColor: "#F0F0F0",
        outline: new outline.Rounded(),
        painter: new painters.Konva(),
        image: puzzleImg,
        fixed: true,
        preventOffstageDrag: true,
      });

      newCanvas.adjustImagesToPuzzleWidth();
      newCanvas.scale(scale);
      newCanvas.autogenerate({
        insertsGenerator: generators.random,
        horizontalPiecesCount: 5,
        verticalPiecesCount: puzzle_orientation == "landscape" ? 3 : 5,
      });
      newCanvas.shuffleGrid();
      newCanvas.registerKeyboardGestures();

      newCanvas.puzzle.pieces.forEach((piece) => {
        const translateY =
          (containerRef.current.clientWidth *
            (puzzle_orientation == "landscape" ? 0.5 : 0.8)) /
          scale;
        piece.translate(-20, translateY);
      });

      newCanvas.draw();

      newCanvas.onConnect(() => audio.play());
      newCanvas.onDisconnect(() => audio.play());

      newCanvas.attachSolvedValidator();
      newCanvas.onValid(() => {
        audioComplete.play();
        setTimeout(() => setShowModal(true), 500);
      });

      setCanvas(newCanvas);
    };
  };

  useEffect(() => {
    initializePuzzle();
  }, [puzzleRef, containerRef, additionalHeight]);

  useEffect(() => {
    additionalHeightHandler();
  }, [containerRef, canvas]);

  useEffect(() => {
    window.addEventListener("resize", () => resizePuzzle());

    return () => {
      window.removeEventListener("resize", () => resizePuzzle());
    };
  }, [resizePuzzle]);

  return (
    <div className={styles.page}>
      <div
        className={styles.container}
        ref={containerRef}
        style={{
          maxWidth: 500,
          height: `calc(100% + ${additionalHeight})`,
        }}
      >
        <div
          className={styles.fake_canvas}
          style={{
            maxHeight: "auto",
            width:
              canvas?.puzzleDiameter?.x *
              (containerRef?.current?.offsetWidth / 500),
            height:
              canvas?.puzzleDiameter?.y *
              (containerRef?.current?.offsetWidth / 500),
          }}
        >
          {
            <img
              src={puzzle.img}
              className={clsx({ [styles.hide]: !hasImage })}
            />
          }
        </div>
        <div className={styles.puzzle} ref={puzzleRef} id="puzzle"></div>
        <Settings
          hasImage={hasImage}
          toggleImage={() => setHasImage((prev) => !prev)}
          solve={() => solvePuzzle()}
          redraw={() => initializePuzzle()}
        />
        <Modal
          modalState={showModal}
          closeModal={() => setShowModal(false)}
          children={
            <SuccessModal
              closeModal={() => setShowModal(false)}
              link={puzzle?.link}
            />
          }
        />
        <div className={styles.back_btn}>
          <IconButton
            onClick={() => navigate(ROUTES.HOME)}
            icon={<HomeIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default DemoPuzzle;

//   const shufflePuzzle = () => {
//     canvas.scale(containerRef.current.offsetWidth / 500);
//     canvas.shuffleGrid();
//     canvas.puzzle.pieces.forEach((piece) => {
//       const translateY = (containerRef.current.clientWidth * 0.95) / scale;
//       piece.translate(-20, translateY);
//     });
//     canvas.redraw();
//   };
