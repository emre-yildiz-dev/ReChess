import { ChessMoveProps } from "./chess-move.interface";

export interface ChessBoardProps {
    startingPosition: string;
    onMoveUpdate: (newMove: ChessMoveProps) => void;
  }
  