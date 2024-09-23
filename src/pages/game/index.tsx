import { Chess, Square } from "chess.js";
import Chessboard from "chessboardjsx";
import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import CustomChessBoard from "../../components/custom-chess-board";
import GameHistoryWindow from "../../components/game-history-window";
import Modal from "../../components/modal";
import { BOARD_COLORS, TBoardColors } from "../../constants";
import { onMouseSquareClick, onPieceMove } from "../../service/chess";
import { RandomMove } from "../../service/random-computer";
import { IComputerMove } from "../../types";

type TDrop = {
    sourceSquare: Square;
    targetSquare: Square;
    piece: string;
};

const Game = () => {
    // States to manage various aspects of the game
    const [board, setBoard] = useState<{ width: number, color: TBoardColors }>({
        width: 500,         // Board width
        color: "green"      // Initial board color
    })
    const [game, setGame] = useState<Chess>(new Chess());  // Initialize a new chess game
    const [boardColor, setBoardColor] = useState<TBoardColors>("green")  // Current board color
    const [position, setPosition] = useState("start")  // Board position (initially "start")
    const [piece, setPiece] = useState("")  // Selected piece (empty by default)
    const [squareStyle, setSquareStyle] = useState({})  // Styles for squares (used for highlights)
    const [history, setHistory] = useState<string[]>([])  // Game move history
    const [resign, setResign] = useState(false)  // Track if the player has resigned
    const [computerAlgorithm, _] = useState<IComputerMove>(new RandomMove());  // Set default algorithm; can be changed when needed


    // Refs for dialogs and board element
    const settingRef = useRef<HTMLDialogElement>(null)
    const resignRef = useRef<HTMLDialogElement>(null)
    const boardRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<HTMLDialogElement>(null)

    // useEffect hook to handle board resizing on window resize
    useEffect(() => {
        resizeListener();  // Initial resize calculation
        window.addEventListener("resize", resizeListener);  // Add resize event listener

        // Cleanup function to remove the event listener on unmount
        return () => {
            window.removeEventListener("resize", resizeListener);
        };
    }, [])

    // Function to reset the game state
    const init = () => {
        setPosition("start")  // Reset board position
        setPiece("")          // Reset selected piece
        setSquareStyle({})    // Reset square styles
        setHistory([])        // Clear game history
        setResign(false)      // Reset resign status
        setGame(new Chess())  // Start a new game
    }

    // Apply selected board color changes
    const submitColorChanges = () => {
        setBoard(prev => { return { ...prev, color: boardColor } })  // Update board color
        if (!settingRef.current) return;
        settingRef.current.close();  // Close settings modal
    }

    // Handle board color selection from the dropdown
    const onOptionChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as TBoardColors  // Get selected value
        setBoardColor(value);  // Update board color state
    };

    // Open the settings modal
    const handleOpenSetting = () => {
        if (!settingRef.current) return;
        settingRef.current.showModal();
    }

    // Open the resign modal
    const handleResign = () => {
        if (!resignRef.current) return;
        resignRef.current.showModal();
    }

    // Listener to update board width on window resize
    const resizeListener = () => {
        if (!boardRef.current) return;
        const width = boardRef.current.clientWidth
        if (width < 220) return  // Prevent setting width below 220px
        setBoard(prev => { return { ...prev, width } })  // Update board width
    };

    // Handle click on a chess square
    const onSquareClick = async (square: Square) => {
        if (resign) return;  // Ignore if the player has resigned

        const squares = onMouseSquareClick(game, square);  // Get available moves for the clicked square
        if (!piece) {  // No piece selected yet
            if (!squares) {  // No available moves
                setSquareStyle({});  // Reset selection if no moves available
                return;
            }
            highlightAvailableMoves(squares, square);  // Highlight possible moves
            return;
        }

        const fen = onPieceMove(game, piece, square);  // Attempt to make a move
        handleMove(fen, squares, square);  // Handle the result of the move
    };

    // Reset piece selection and clear highlights
    const resetSelection = () => {
        setPiece("");
        setSquareStyle({});
    };

    // Highlight available moves for a selected piece
    const highlightAvailableMoves = (squares: object, square: Square) => {
        setSquareStyle(squares);  // Highlight available squares
        setPiece(square);  // Set the selected piece
    };

    // Handle making a move
    const handleMove = async (fen: string | undefined, squares: object | undefined, square: Square) => {
        if ((!fen && !squares) || piece === square) {
            resetSelection();  // Reset if no valid move
        }
        else if (!fen && squares) {
            highlightAvailableMoves(squares, square);  // Highlight possible moves
        }
        else if (fen) {
            updateGameAfterMove(fen);  // Update game state after the move
            const computerMove = await delayedRandomMove();  // Let the computer make a random move
            if (computerMove) updateGameAfterMove(computerMove);  // Update after computer's move
        }
    };

    // Update the game state after a move
    const updateGameAfterMove = (fen: string) => {
        setHistory(game.history());  // Update move history
        setPosition(fen);  // Update board position
        resetSelection();  // Reset piece selection
        if (game.isGameOver()) onGameOver();  // Check if the game is over
    };

    // Handle the piece drop event
    const onDrop = async ({ sourceSquare, targetSquare }: TDrop) => {
        if (resign) return;

        const fen = onPieceMove(game, sourceSquare, targetSquare)  // Try to move a piece
        if (fen) {
            setHistory(game.history());  // Update history
            setPosition(fen);  // Set the new board position
            resetSelection();  // Clear selection
            if (game.isGameOver()) return onGameOver();  // Check for game over

            const computerMove = await delayedRandomMove();  // Let the computer move
            if (computerMove) {
                setPosition(computerMove);  // Update board position after computer move
                setHistory(game.history());  // Update history
            }
            if (game.isGameOver()) onGameOver();  // Check for game over
        }
    }

    // Handle square drag event
    const onDragOverSquare = (_: Square) => {
        resetSelection();  // Reset selection on drag
    }

    // Handle resignation
    const onResign = () => {
        resignRef.current?.close();  // Close the resign modal
        onGameOver();  // End the game
        setResign(true);  // Mark the player as resigned
    }

    // Handle the end of the game
    const onGameOver = () => {
        gameRef.current?.showModal();  // Show game over modal
    }

    // Simulate a computer move with a delay
    const delayedRandomMove = (timer: number = 450): Promise<string | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const randomComputerMove = computerAlgorithm.getMove(game);  // Make a random move for the computer
                resolve(randomComputerMove);
            }, timer);
        });
    }

    return (
        <div className="flex flex-col md:flex-row md:justify-center sm:items-center md:items-stretch gap-4 max-w-[1100px] mt-4 p-4 mx-auto">
            <div ref={boardRef} className="w-full max-w-[500px]">
                <Chessboard
                    calcWidth={(_) => board.width}
                    darkSquareStyle={{ backgroundColor: BOARD_COLORS[board.color] }}
                    lightSquareStyle={{ background: "rgba(229 231 235)" }}
                    position={position}
                    onSquareClick={onSquareClick}
                    onDrop={onDrop}
                    onDragOverSquare={onDragOverSquare}
                    squareStyles={squareStyle}
                    draggable
                />
            </div>
            <div className="max-w-[500px] w-full">
                <GameHistoryWindow
                    handleOpenSetting={handleOpenSetting}
                    handleResign={handleResign}
                    data={history}
                    isGameOver={game.isGameOver() || resign}
                    resetGame={init} />
            </div>

            <Modal ref={settingRef}>
                <div>
                    <CustomChessBoard boardColor={boardColor} />
                    <div className="flex justify-between items-center my-4">
                        <label htmlFor="board_selector">Customize Board:</label>
                        <select defaultValue={boardColor} id="board_selector" className="select select-bordered w-full max-w-xs" onChange={onOptionChangeHandler} >
                            {Object.keys(BOARD_COLORS).map(item => {
                                const option = item.charAt(0).toUpperCase() + item.slice(1)
                                return <option value={item} key={item} >{option}</option>
                            })}
                        </select>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-accent" onClick={submitColorChanges}>Submit</button>
                    </div>
                </div>
            </Modal>

            <Modal ref={resignRef}>
                <h3 className="text-lg font-bold">Resign</h3>
                <p className="py-4">Are you sure you want to resign</p>
                <div className="modal-action">
                    <button className="btn" onClick={() => resignRef.current?.close()}>No</button>
                    <button className="btn btn-accent" onClick={onResign}>Yes</button>
                </div>
            </Modal>

            <Modal ref={gameRef}>
                <h3 className="text-lg font-bold">
                    {game.isCheckmate()
                        ? "Checkmate"
                        : resign
                            ? "Resigned"
                            : "Draw"
                    }
                </h3>
                {(game.isCheckmate() || resign) && <p className="py-4">{game.turn() === "w" || resign ? "Computer" : "You"} Won</p>}
                {game.isDraw() &&
                    <p className="py-4">
                        Draw by {game.isInsufficientMaterial() ?
                            "insuffient Material"
                            : game.isStalemate()
                                ? "stalemate"
                                : "repition"}
                    </p>
                }
                <div className="modal-action">
                </div>
            </Modal>
        </div>
    )
}


export default memo(Game)