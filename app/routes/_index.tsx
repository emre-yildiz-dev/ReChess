import { DEFAULT_POSITION } from "lib/chess";
import { ChessMoveProps } from "models/chess-move.interface";
import { useState } from "react";
import ReChessBoard from "~/components/chess-board";
import Footer from "~/components/footer";
import NavBar from "~/components/navigation/navigation-bar";
import { RootBackground } from "~/components/root-background";
import { Container } from "~/components/ui/container";

const MainContent = () => {
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [moveHistory, setMoveHistory] = useState<ChessMoveProps[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const handleMoveUpdate = (newMove: ChessMoveProps) => {
    setMoveHistory((prev) => [...prev, newMove]);
  };

  const updateBoardToMove = (moveIndex: number) => {
    const move = moveHistory[moveIndex];

    setCurrentMoveIndex(moveIndex);
    setPosition(move.fenCode);
  };
  return (
    <>
      <RootBackground>
        <Container>
          <NavBar />
          <div className="flex flex-col items-center justify-center">
        <ReChessBoard
              key={position}
            />
            </div>
            <Footer />
        </Container>
      </RootBackground>
    </>
  );
};

export default MainContent;
