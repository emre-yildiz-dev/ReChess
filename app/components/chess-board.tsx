import { Chess } from "../../lib/chess";
import React, { useEffect, useState } from "react";
import { tryCatch, fold } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { ChessMoveProps } from "models/chess-move.interface";
import { Piece, PromotionPieceOption, Square } from "~/chessboard/types";
import { Chessboard } from "~/chessboard";

type PromotionPiece = 'n' | 'b' | 'r' | 'q';

type Move = {
    from: string;
    to: string;
    piece: string;
    promotion?: string;
}

const ChessBoard: React.FC = () => {
    const [gameState, setGameState] = useState(new Chess());
    const [gameStateHistory, setGameStateHistory] = useState<Chess[]>([]);
    const [moveHistory, setMoveHistory] = useState<ChessMoveProps[]>([]);
    const [move, setMove] = useState<Move | undefined>(undefined);

    useEffect(() => {
        setGameState(new Chess());
    }, []);

    const attemptMove = (moveDetails: Move) => {
        return pipe(
            tryCatch(
                () => {
                    const updatedGame = new Chess(gameState.fen());
                    const moveResult = updatedGame.move(moveDetails);
                    if (moveResult) {
                        const newMove: ChessMoveProps = {
                            fenCode: updatedGame.fen(),
                            from: moveDetails.from,
                            to: moveDetails.to,
                            move: moveResult.san, // Assuming moveResult has SAN notation
                            piece: moveResult.piece,
                        };
                        setMoveHistory((prev) => [...prev, newMove]);
                        setGameStateHistory((prev) => [...prev, updatedGame]);
                    } else {
                        throw new Error("Illegal move");
                    }

                    return updatedGame;
                },
                () => "Illegal move"
            ),
            fold(
                () => false,
                (updatedGame) => {
                    setGameState(updatedGame);

                    return true;
                }
            )
        );
    };

    const handlePieceDrop = (sourceSquare: string, targetSquare: string, piece: string) => {
        if(isPromotionMove({
            from: sourceSquare,
            to: targetSquare,
            piece: piece,
        })) {
           return false;
        }
        const moveResult = attemptMove({
            from: sourceSquare,
            to: targetSquare,
            piece: piece,
        });

        return moveResult;
    };


    const onPromotionPieceSelect = (piece: PromotionPieceOption | undefined) => {
        const promotionPiece = piece?.toLocaleLowerCase().charAt(1) as PromotionPiece;
        const moveWithPromotion: Move = {
            from: move!.from,
            to: move!.to,
            piece: move!.piece,
            promotion: promotionPiece,
        };
        console.log("moveWithPromotion", moveWithPromotion);
        attemptMove(moveWithPromotion);
        return true;
    };

    
    function onPromotionCheck(sourceSquare: Square, targetSquare: Square, piece: Piece): boolean {
        if (isPromotionMove({
            from: sourceSquare,
            to: targetSquare,
            piece: piece,
        })) {
            setMove({
                from: sourceSquare,
                to: targetSquare,
                piece: piece,
            });
            return true;
        }

        return false;
    }

    return (
        <Chessboard
            id="Configurable Board"
            position={gameState.fen()}
            onPieceDrop={handlePieceDrop}
            boardWidth={700}
            showBoardNotation={true}
            onPromotionPieceSelect={onPromotionPieceSelect}
            onPromotionCheck={onPromotionCheck}
        />
    );
};
function isPromotionMove(move: Move): boolean {
    return (move.piece.includes("wP") && move.to.includes("8")) || (move.piece.includes("bP") && move.to.includes("1"));
}

export default ChessBoard;

